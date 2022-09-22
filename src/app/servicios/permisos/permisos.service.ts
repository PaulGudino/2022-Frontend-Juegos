import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Permisos } from 'src/app/interfaces/permisos/permisos';
import { PermisosbyRol } from 'src/app/interfaces/permisos/permisosbyrol';
import { PermisosbyRolCrear } from 'src/app/interfaces/permisos/permisosbyRolCrear';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(
    private http: HttpClient,
    private puente: PuenteDatosService
  ) { }

  url = this.puente.geturl();
  
  getPermisos():Observable<Permisos[]>{
    return this.http.get<Permisos[]>(this.url+'api/permission/');
  }
  getPermisosbyRol(id:number):Observable<PermisosbyRol[]>{
    return this.http.get<PermisosbyRol[]>(this.url+'api/rolpermissionfilter/?rol='+id);
  }
  postPermisosbyRol(permission: PermisosbyRolCrear){
    return this.http.post(this.url+'api/rolpermission/', permission);
  }
  deletePermissionRol(id:number){
    return this.http.delete(this.url+'api/rolpermission/'+id);
  }
}
