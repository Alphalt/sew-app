import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CanActivateViaAuthGuard } from './guards/can-activate';

export const routes: Routes = [
    { path: 'log-in', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'log-in', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];

//, canActivate: [CanActivateViaAuthGuard]