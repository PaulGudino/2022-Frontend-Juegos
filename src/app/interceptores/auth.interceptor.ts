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

    static accessToken = '';
    refresh = false;

    constructor(private http: HttpClient) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const req = request.clone({
            setHeaders: {
                Authorization: `Bearer ${AuthInterceptor.accessToken}`
            }
        });
        return next.handle(req).pipe(catchError((err: HttpErrorResponse) =>{
            if (err.status === 401 && !this.refresh) {
                this.refresh = true;
                return this.http.post('https://juegos.pythonanywhere.com/token/refresh/', {}, {withCredentials: true}).pipe(
                    switchMap((data: any) => {
                        AuthInterceptor.accessToken = data.accessToken;
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