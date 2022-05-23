import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ){ 
    this.authService.loggedIn$.subscribe(
    (loggedIn) => (this.isUserLoggedIn = loggedIn)
    );
  }
  isUserLoggedIn!: boolean;
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.isUserLoggedIn) {
      return true;
    } 
    this.router.navigate(['login'])
    return false;
  }
  
}
