//            External Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { UsuariosModule } from '../Usuarios/usuarios.module';

//            Components
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const redirectLoggedIn = () => redirectLoggedInTo(['Home']);

const routes: Routes = [
  {path: '', component: LoginComponent, ...canActivate(redirectLoggedIn)},
  {path: 'SignIn', component: RegistroComponent, ...canActivate(redirectLoggedIn)}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuariosModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccessModule { }
