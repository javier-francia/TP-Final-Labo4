//            External Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

//            Components
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';


//            MD_Bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ContactoComponent } from './contacto/contacto.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {path: 'Home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'Contacto', component: ContactoComponent, ...canActivate(redirectUnauthorizedToLogin)}
];

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ContactoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    MenuComponent
  ]
})
export class NavegacionModule { }
