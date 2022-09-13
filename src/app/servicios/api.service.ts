import { UsuariosCrear } from './../interfaces/usuariocrear';
import { Usuarios } from './../interfaces/usuarios';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu';
import { Roles } from '../interfaces/roles';
import { UsuariosEditar } from '../interfaces/usuarioeditar';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }

  getMenu():Observable<Menu[]>{
    return this.http.get<Menu[]>('/assets/data/menu.json');
  }

  getUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.url+'api/user/');
  }

  getUsuarioId(id:number):Observable<Usuarios>{
    return this.http.get<Usuarios>(this.url+'api/user/'+id);
  }

  postUsuarios(user: UsuariosCrear){
    return this.http.post(this.url+'api/create/user/', user);
  }

  putUsuario(id:number, user: UsuariosEditar){
    return this.http.put(this.url+'api/user/'+id+'/', user);
  }

  deleteUsuario(id:number):Observable<Usuarios>{
    return this.http.delete<Usuarios>(this.url+'api/user/'+id);
  }

  getRoles():Observable<Roles[]>{
    return this.http.get<Roles[]>(this.url+'api/rol/');
  }












}
