//            External Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//            Project Modules


//            Components
import { AppComponent } from './app.component';
import { LoginComponent } from './Access/login/login.component';
import { RegistroComponent } from './Access/registro/registro.component';

//            Environment
import { environment } from '../environments/environment.prod';
import { HomeComponent } from './Navegacion/home/home.component';
import { MenuComponent } from './Navegacion/menu/menu.component';
import { ErrorComponent } from './Navegacion/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    MenuComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
