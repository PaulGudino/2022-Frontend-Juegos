import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse, HttpClient
  } from '@angular/common/http';
  import {catchError, Observable, switchMap, throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    static accessToken = localStorage.getItem('token');
    refresh = false;

    constructor(private http: HttpClient) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let req = request;

        if (AuthInterceptor.accessToken) {
            req = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${AuthInterceptor.accessToken}`,
                }
            });
        }
        return next.handle(req).pipe(catchError((err: HttpErrorResponse) =>{
            if (err.status === 401 && !this.refresh) {
                this.refresh = true;

                let formData: FormData = new FormData();
                let refreshroken!: string;
                refreshroken = localStorage.getItem('refresh')!;
                formData.append('refresh', refreshroken);

                return this.http.post('http://localhost:8000/token/refresh/', formData, {withCredentials: true}).pipe(
                // return this.http.post('https://juegos.pythonanywhere.com/token/refresh/', formData, {withCredentials: true}).pipe(
                    switchMap((data: any) => {
                        console.log(data);
                        localStorage.setItem('token', data.access);
                        localStorage.setItem('refresh', data.refresh);
                        AuthInterceptor.accessToken = data.access;
                        const req = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${AuthInterceptor.accessToken}`
                            }
                        });
                        return next.handle(req);
                    })
                );
            }
            this.refresh = false;
            return throwError(() => err);
        }));
        // return next.handle(request);
    }

}
