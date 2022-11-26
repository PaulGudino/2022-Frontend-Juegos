import { UsuariosFiltradobyRol } from '../../interfaces/usuarios/usuariofilterbyRol';
import { Usuarios } from '../../interfaces/usuarios/usuarios';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../../interfaces/menu';
import { Roles } from '../../interfaces/roles/roles';
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

  getUsuarios(filter: string):Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.url+'api/userfilter/'+filter);
  }

  getUsuarioId(id:number):Observable<Usuarios>{
    return this.http.get<Usuarios>(this.url+'api/user/'+id + '/');
  }

  getRolbyName(name:string):Observable<Roles[]>{
    return this.http.get<Roles[]>(this.url+'api/rolfilter/?name='+name);
  }

  postUsuarios(form: FormData){
    return this.http.post(this.url+'api/user/', form);
  }

  putUsuario(id:number, form: FormData){
    return this.http.put(this.url+'api/user/'+id+'/', form);
  }

  deleteUsuario(id:number):Observable<Usuarios>{
    return this.http.delete<Usuarios>(this.url+'api/user/'+id + '/');
  }

  getRoles():Observable<Roles[]>{
    return this.http.get<Roles[]>(this.url+'api/rol/');
  }
  getRolesFilter(filter: string):Observable<Roles[]>{
    return this.http.get<Roles[]>(this.url+'api/rolfilter/'+filter);
  }
  getfilteUsuariobyRol(id:number):Observable<UsuariosFiltradobyRol[]>{
    return this.http.get<UsuariosFiltradobyRol[]>(this.url+'api/userfilter/?rol='+id);
  }
  postCambiarContraseña(id:number, form: FormData){
    return this.http.post(this.url+'api/user/'+id+'/change_password/', form);
  }
  postCambiarisActivate(id:number){
    return this.http.post(this.url+'api/user/'+id+'/activate_user/', null);
  }

}
