import { SnackbarService } from './../../../servicios/snackbar/snackbar.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioscrearGuard implements CanActivate {

  Permiso_id = 1;
  permitido = false;

  constructor(
    private permisos_api : PermisosService,
    private router: Router,
    private snackbar : SnackbarService,
  ) { }



  VistaPermitida(){
    let rol = Number(localStorage.getItem('rol_id'));
    this.permisos_api.getPermisosbyRolandPermission(rol, this.Permiso_id).subscribe(
        (data) => {
        if (data.length > 0) {
          this.permitido = true;
          console.log('1');
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
      console.log('2');
      return true;
    }else{
      console.log('3');
      this.snackbar.mensaje('No tienes permisos para crear usuarios');
      this.router.navigate(['/dashboard/usuarios']);
      return false;
    }
  }
}


