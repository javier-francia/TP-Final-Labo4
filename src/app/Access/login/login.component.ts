import { Component, OnInit } from '@angular/core';
import { AccessService } from '../access.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../Usuarios/usuarios.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  pass: string;

  constructor(public accessSvc: AccessService,
              private usuariosSvc: UsuariosService,
              private router: Router) {}

  ngOnInit(): void {
    this.accessSvc.CleanLocalStorage();
  }

  tryLogin(input: NgForm)
  {
    return this.accessSvc
      .LoginWithEmail(this.email, this.pass)
      .then(res => {
        let perfil;
        // Implementacion de login OK

        let usuarioObservable = this.usuariosSvc.GetUsuario(this.email).snapshotChanges().subscribe((userSnapshot: any) => {
          if(userSnapshot.length > 0)
          {
            perfil = userSnapshot[0].payload.doc.data().perfil;
            let habilitado: boolean = userSnapshot[0].payload.doc.data().habilitado;

            this.accessSvc.LoadLocalStorage(this.email, perfil, habilitado);
            this.router.navigate(['Home']);
            console.info(`Logged with email: ${this.email}`);
          }
          usuarioObservable.unsubscribe();
        });

        
      })
      .catch(err => {
        if (err.code == "auth/user-not-found")
        {
          // Implementacion no encontro usuario
        }
        else if (err.code == "auth/wrong-password")
        {
          // Implementacion contraseña incorrecta
        }
        console.error(err);
      });
  }

  HardcodeoUsuarios(perfil: string)
  {
    switch(perfil)
    {
      case "Admin":
        this.email = "administrador@tpfinal.com";
        this.pass = "tpfinalJF!";
        break;
      case "Paciente":
        this.email = "johndoe@tpfinal.com";
        this.pass = "tpfinalJF!";
        break;
      case "ProfesionalHabilitado":
        this.email = "rene@tpfinal.com";
        this.pass = "tpfinalJF!";
        break;
      case "ProfesionalInhabilitado":
        this.email = "nickriviera@tpfinal.com";
        this.pass = "tpfinalJF!";
        break;
    }
    if(document.getElementById("btnSubmit").attributes.getNamedItem("disabled") !== null) document.getElementById("btnSubmit").attributes.removeNamedItem("disabled");

    //console.log(document.getElementById("btnSubmit").attributes.getNamedItem("disabled"))
  }

}
