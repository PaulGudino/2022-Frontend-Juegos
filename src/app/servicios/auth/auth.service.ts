import { Logout } from '../../interfaces/auth/logout';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/auth/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://juegos.pythonanywhere.com/';
  // url = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }

  Login(login: Login){
    return this.http.post(this.url+'auth/login/', login);
  }

  Logout(logout: Logout){
    return this.http.post(this.url+'auth/logout/', logout);
  }

}
