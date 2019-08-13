import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { SignUp } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  getState: Observable<any>;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.createRegisterForm();
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registerUser(formvalues){
    let user = new User();
    user.names = formvalues.names;
    user.lastnames = formvalues.lastNames;
    user.email = formvalues.email;
    user.password = formvalues.password;
    this.store.dispatch(new SignUp(user));
  }

}
