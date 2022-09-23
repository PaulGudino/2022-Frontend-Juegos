import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RoleseditarGuard implements CanActivate {

  Permiso_id = 7;
  permitido = false;

  constructor(
    private permisos_api : PermisosService,
    private router: Router,
    private snackbar : SnackbarService,
  ) { }
  
  VistaPermitida(){
    let rol = Number(localStorage.getItem('rol_id'));
    this.permisos_api.getPermisosbyRolandPermission(rol, this.Permiso_id).subscribe(
      async (data) => {
        if (data.length > 0) {
          this.permitido = true;
        } else {
          this.permitido = false;
        }
      }
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    this.VistaPermitida();
    if (this.permitido) {
      return true;
    }else{
      this.snackbar.mensaje('No tienes permisos para editar roles');
      this.router.navigate(['/dashboard/roles']);
      return false;
    }
  }
  
}
