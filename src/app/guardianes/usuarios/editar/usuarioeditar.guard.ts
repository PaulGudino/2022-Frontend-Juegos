import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioeditarGuard implements CanActivate {

  Permiso_id = 3;
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
          console.log('Permitido');
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
      this.snackbar.mensaje('No tienes permisos para editar usuarios');
      this.router.navigate(['/dashboard/usuarios']);
      return false;
    }

  }
  
}
