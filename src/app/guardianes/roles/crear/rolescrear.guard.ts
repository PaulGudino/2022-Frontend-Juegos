import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PermisosService } from 'src/app/servicios/permisos/permisos.service';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class RolescrearGuard implements CanActivate {

  Permiso_id = 5;
  permitido = false;

  constructor(
    private permisos_api : PermisosService,
    private router: Router,
    private snackbar : SnackbarService,
  ) { }

  
  async VistaPermitida(){
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
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      
    await this.VistaPermitida();
    console.log('2');
    if (this.permitido) {
      return true;
    }else{
      this.snackbar.mensaje('No tienes permisos para crear roles');
      this.router.navigate(['/dashboard/roles']);
      return false;
    }
  }
  
}
