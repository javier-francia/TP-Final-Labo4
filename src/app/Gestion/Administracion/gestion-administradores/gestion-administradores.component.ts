import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../../Access/access.service';
import { UsuariosService } from '../../../Usuarios/Usuario/usuarios.service';
import { AdministradoresService } from '../../../Usuarios/Admin/administradores.service';
import { PacientesService } from '../../../Usuarios/Paciente/pacientes.service';
import { ProfesionalesService } from '../../../Usuarios/Profesional/profesionales.service';
import { BrowserStorageService } from '../../../Access/browser-storage.service';
import { FileStorageService } from '../../../Shared/file-storage.service';
import { Router } from '@angular/router';
import { Admin } from '../../../Usuarios/Admin/admin';
import { AccessLog } from '../../../Access/access-log';

@Component({
  selector: 'app-gestion-administradores',
  templateUrl: './gestion-administradores.component.html',
  styleUrls: ['./gestion-administradores.component.css']
})
export class GestionAdministradoresComponent implements OnInit {

  newId: number;
  cargaOk = false;

  error = "";

  constructor(public accessSvc: AccessService,
    private usuariosSvc: UsuariosService,
    private adminSvc: AdministradoresService) { }

  ngOnInit(): void {
    let idSetter = this.usuariosSvc.Get().subscribe(usuariosSnapshot => {
      this.newId = usuariosSnapshot.length + 1;
      idSetter.unsubscribe();
    });
  }

  tryRegister(input: any)
  {
    this.error = "";
    return this.accessSvc
      .RegisterWithEmail(input.obj.email, input.password)
      .then(res => {
        // Implementacion de registro OK
        this.accessSvc.GetCurrentUser()
          .then(user => {
            let habilitado = true;

            this.usuariosSvc.Insert(this.newId, input.obj.email, "Admin", habilitado)
              .then(() => {
                // Mando mail de validacion
                user.sendEmailVerification()
                .then();

                // Inserto en tabla correspondiente
                
                let admin = new Admin();
                admin.id = this.newId; admin.nombre = input.obj.nombre; admin.apellido = input.obj.apellido; admin.email = input.obj.email;
                admin.superUser = false;
                this.adminSvc.Insert(admin);
                //TODO OK

                this.cargaOk = true;
              })
              .catch(err => {
                console.log(err);
              });
            
          })
          .catch(err => {
            // Imple error al obtener usuario actual
          })
      })
      .catch(err => {
        if(err.code === "auth/email-already-in-use")
        {
          this.error = "Ya existe un usuario con el email " + input.obj.email;

          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function(){x.className = x.className.replace("show", "");}, 4000);
        } 
        console.log(err);
      });
  }

}
