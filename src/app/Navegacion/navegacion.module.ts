//            External Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

//            Components
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ErrorComponent } from './error/error.component';

//            MD_Bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {path: 'Home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: '**', component: ErrorComponent, ...canActivate(redirectUnauthorizedToLogin)}
];

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot(),
  ]
})
export class NavegacionModule { }
