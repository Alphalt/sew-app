import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  getState: Observable<any>;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.createLoginForm();
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(formvalues) {
    let user = new User();
    user.email = formvalues.email;
    user.password = formvalues.password;
    this.store.dispatch(new LogIn(user));
  }

}
