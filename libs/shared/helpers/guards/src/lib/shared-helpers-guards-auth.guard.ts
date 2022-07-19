import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SharedServicesAuthModule } from '@general-app/shared/services/auth';

@Injectable({
  providedIn: 'root'
})
export class  AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: SharedServicesAuthModule
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser') !== null) {
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login']);
    return false;
  }

  checkTokenExpiration(){
    if (localStorage.getItem('currentUser') !== null) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login']);
    return false;
  }
  
  canLoad() {
    if (localStorage.getItem('currentUser') !== null) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login']);
    return false;
  }
}
