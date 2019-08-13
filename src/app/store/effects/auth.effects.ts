import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, BehaviorSubject } from 'rxjs';
import { map, filter, scan, tap, switchMap, mergeMap } from 'rxjs/operators';

import { AuthService } from '../../services/login/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, SignUp, SignUpSuccess, SignUpFailure, LogOut } from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  @Effect()
  Login: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .pipe(
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.login(payload.email, payload.password)
          .then(result => {
            return new LogInSuccess({
              email: payload.email,
              names: payload.names,
              lastnames: payload.names,
              password: payload.password
            });
          })
          .catch(error => {
            console.log("El error: ", error);
            return new LogInFailure({ error: error.message });
          });
      }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      console.log(user);
      this.router.navigateByUrl('/home');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions
    .ofType(AuthActionTypes.SIGNUP)
    .pipe(
      map((action: SignUp) => action.payload),
      switchMap(payload => {
        return this.authService.signup(payload.email, payload.password)
          .then(result => {
            return new SignUpSuccess({
              email: payload.email,
              names: payload.names,
              lastnames: payload.names,
              password: payload.password
            });
          })
          .catch((error) => {
            console.log(error);
            return new SignUpFailure({ error: error });
          });
      }));

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.router.navigateByUrl('/log-in');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGOUT)
    .pipe(
      switchMap(payload => {
        return this.authService.logout()
          .then(result => {
            this.router.navigateByUrl('/log-in');
          })
      })
    );

}