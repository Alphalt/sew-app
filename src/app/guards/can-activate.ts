import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.states';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { isNullOrUndefined } from 'util';
import { AuthService } from '../services/login/auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  getState: Observable<any>;

  constructor(private store: Store<AppState>, private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    this.getState = this.store.select(selectAuthState);
    this.getState.subscribe((state) => {
      if (this.authService.isLoggedIn() && state.isAuthenticated) {
        return true;
      } else {
        this.router.navigateByUrl('/log-in');
        return false;
      }
    });
    return false;
  }
}