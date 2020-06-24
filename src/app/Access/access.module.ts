//            External Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//            Project Modules
import { UsuariosModule } from '../Usuarios/usuarios.module';

//            Components
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MiCaptchaComponent } from './mi-captcha/mi-captcha.component';


const redirectLoggedIn = () => redirectLoggedInTo(['Home']);

const routes: Routes = [
  {path: '', component: LoginComponent, data: {animation: 'Login'}, ...canActivate(redirectLoggedIn)},
  {path: 'SignIn', component: RegistroComponent, data: {animation: 'SignIn'}, ...canActivate(redirectLoggedIn)}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    MiCaptchaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot(),
    //BrowserAnimationsModule
  ],
  exports: [RouterModule]
})
export class AccessModule { }
