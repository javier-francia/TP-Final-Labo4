import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Access/login/login.component';
import { HomeComponent } from './Navegacion/home/home.component';
import { ErrorComponent } from './Navegacion/error/error.component';
import { RegistroComponent } from './Access/registro/registro.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';


// const adminOnly = () => hasCustomClaim('admin');
// canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly }},

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
//const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
//const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);
const redirectLoggedIn = () => redirectLoggedInTo(['Home']);

const routes: Routes = [
  {path: '', component: LoginComponent, ...canActivate(redirectLoggedIn)},
  {path: 'SignIn', component: RegistroComponent, ...canActivate(redirectLoggedIn)},
  {path: 'Home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: '**', component: ErrorComponent, ...canActivate(redirectUnauthorizedToLogin)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
