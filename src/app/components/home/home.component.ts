import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logout() {
    this.store.dispatch(new LogOut);
  }

}
