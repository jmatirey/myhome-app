import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isAuth = this.sessionService.isAuthenticated();
      if (!isAuth) {
        console.log('user is not auth front isAuthGuard');
        this.router.navigate(['/login']);
      } 
      console.log('user is auth front isAuthGuard');
      return true;
    }
  }
