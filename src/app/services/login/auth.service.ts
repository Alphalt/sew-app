import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        }
        else {
          this.userDetails = null;
        }
      });
  }

  isLoggedIn() {
    if (this.userDetails === null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    return this._firebaseAuth.auth.signOut();
  }

  login(email: string, password: string) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string){
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
