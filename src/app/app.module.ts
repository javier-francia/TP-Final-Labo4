//            External Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
//            Project Modules
import { AccessModule } from './Access/access.module';
import { UsuariosModule } from './Usuarios/usuarios.module';
import { NavegacionModule } from './Navegacion/navegacion.module';
import { GestionModule } from './Gestion/gestion.module';
import { ErrorRoutingModule } from './Navegacion/error-routing.module';

//            Components
import { AppComponent } from './app.component';


//            Environment
import { environment } from '../environments/environment.prod';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as firebase from 'firebase';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

firebase.initializeApp(environment.firebaseConfig);


const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    AccessModule,
    UsuariosModule,
    GestionModule,
    NavegacionModule, 
    ErrorRoutingModule,// Ultimo feature module por contener '**'
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }