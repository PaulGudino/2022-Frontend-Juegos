import { SnackbarService } from './../../../servicios/snackbar/snackbar.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioscrearGuard implements CanActivate {

  Permiso_id = 1;

  constructor(
    private permisos_api : PermisosService,
    private router: Router,
    private snackbar : SnackbarService,
  ) { }


  async canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Promise<boolean> {
    
    let rol = Number(localStorage.getItem('rol_id'));
    const promesa =  await lastValueFrom(this.permisos_api.getPermisosbyRolandPermission(rol, this.Permiso_id));
    if (promesa.length > 0) {
      return true;

    } else {
      this.snackbar.mensaje('No tienes permisos para crear usuarios');
      return false;
    }
  }
}


