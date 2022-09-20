import { UsuariosFiltradobyRol } from './../../interfaces/usuarios/usuariofilterbyRol';
import { UsuariosCrear } from '../../interfaces/usuarios/usuariocrear';
import { Usuarios } from '../../interfaces/usuarios/usuarios';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../../interfaces/menu';
import { Roles } from '../../interfaces/roles/roles';
import { UsuariosEditar } from '../../interfaces/usuarios/usuarioeditar';
import { RolesCrear } from '../../interfaces/roles/rolescrear';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = this.puente.geturl();

  constructor(private http: HttpClient, private puente: PuenteDatosService) { }

  getMenu():Observable<Menu[]>{
    return this.http.get<Menu[]>('/assets/data/menu.json');
  }

  getUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.url+'api/user/');
  }

  getUsuarioId(id:number):Observable<Usuarios>{
    return this.http.get<Usuarios>(this.url+'api/user/'+id);
  }

  getRolbyName(name:string):Observable<Roles[]>{
    return this.http.get<Roles[]>(this.url+'api/rolfilter/?name='+name);
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
  getfilteUsuariobyRol(id:number):Observable<UsuariosFiltradobyRol[]>{
    return this.http.get<UsuariosFiltradobyRol[]>(this.url+'api/userfilter/?rol='+id);
  }











}
