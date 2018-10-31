import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class NotGoIfLoggedInGuardGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.sessionService.isAuthenticated();

    if (!isAuth) {
      console.log('not logged, you can go to login');
      return true;
    } else{
      console.log('cannot go to login cause you are logged');
      this.router.navigate(['/home']);
    }
    
  }
}
