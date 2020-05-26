import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { Routes, RouterModule } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { NavegacionModule } from './navegacion.module';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {path: '**', component: ErrorComponent, ...canActivate(redirectUnauthorizedToLogin)}
];


@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    NavegacionModule,
    RouterModule.forChild(routes),
  ]
})
export class ErrorRoutingModule { }
