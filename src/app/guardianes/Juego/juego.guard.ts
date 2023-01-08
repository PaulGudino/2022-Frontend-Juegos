import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoGuard implements CanActivate {

  constructor(
    private router: Router,
    ) { }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let validate = route.data['Validate_game'];
      let validate_game = sessionStorage.getItem(validate);

      if (validate_game) {
        return true;
      } else {
        this.router.navigate(['/juego']);
        return false;
      }
  }
  
}
