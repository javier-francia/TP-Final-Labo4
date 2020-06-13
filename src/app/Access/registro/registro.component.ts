import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//      Entidades
import { Admin } from '../../Usuarios/Admin/admin';
import { Paciente } from '../../Usuarios/Paciente/paciente';
import { Profesional } from '../../Usuarios/Profesional/profesional';
//      Servicios
import { UsuariosService } from '../../Usuarios/Usuario/usuarios.service';
import { AdministradoresService } from '../../Usuarios/Admin/administradores.service';
import { PacientesService } from '../../Usuarios/Paciente/pacientes.service';
import { ProfesionalesService } from '../../Usuarios/Profesional/profesionales.service';
import { AccessService } from '../access.service';
import { BrowserStorageService } from '../browser-storage.service';
import { FileStorageService } from '../../Shared/file-storage.service';
import { Upload } from 'src/app/Shared/upload';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  entidad = "Paciente";
  newId: number;
  img1: Upload;
  img2: Upload;

  constructor(public accessSvc: AccessService,
              private usuariosSvc: UsuariosService,
              private adminSvc: AdministradoresService,
              private pacientesSvc: PacientesService,
              private profesionalesSvc: ProfesionalesService,
              private browserStorageSvc: BrowserStorageService,
              private fileStorageSvc: FileStorageService,
              private router: Router) { }

  ngOnInit(): void {
    let idSetter = this.usuariosSvc.Get().subscribe(usuariosSnapshot => {
      this.newId = usuariosSnapshot.length + 1;
      idSetter.unsubscribe();
    });

  }

  tryRegister(input: any)
  {
    return this.accessSvc
      .RegisterWithEmail(input.obj.email, input.password)
      .then(res => {
        // Implementacion de registro OK
        this.accessSvc.GetCurrentUser()
          .then(user => {
            let habilitado = true;
            if(this.entidad == "Profesional") habilitado = false;

            this.usuariosSvc.Insert(this.newId, input.obj.email, this.entidad, habilitado)
              .then(() => {
                // Mando mail de validacion
                user.sendEmailVerification()
                .then();

                // Inserto en tabla correspondiente
                switch(this.entidad)
                {
                  case "Paciente":
                    {  
                      let paciente = new Paciente();
                      this.img1 = input.img1 as Upload;
                      this.img2 = input.img2 as Upload;
                      this.img1.name = `${this.newId}-img1.${this.img1.extension}`;
                      this.img2.name = `${this.newId}-img2.${this.img2.extension}`;

                      this.fileStorageSvc.pushUpload(this.img1, this.img1.name);
                      this.fileStorageSvc.pushUpload(this.img2, this.img2.name);


                      paciente.id = this.newId; paciente.nombre = input.obj.nombre; paciente.apellido = input.obj.apellido; paciente.email = input.obj.email;
                      paciente.img1 = this.img1.name; paciente.img2 = this.img2.name;
                      this.pacientesSvc.Insert(paciente);
                    }
                    break;
                  case "Profesional":
                    {
                      let profesional = new Profesional();
                      profesional.id = this.newId; profesional.nombre = input.obj.nombre; profesional.apellido = input.obj.apellido; profesional.email = input.obj.email;
                      profesional.especialidades = input.obj.especialidades;
                      this.profesionalesSvc.Insert(profesional);
                    }
                    break;
                  case "Admin":
                    {
                      let admin = new Admin();
                      admin.id = this.newId; admin.nombre = input.obj.nombre; admin.apellido = input.obj.apellido; admin.email = input.obj.email;
                      admin.superUser = false;
                      this.adminSvc.Insert(admin);
                    }
                    break;
                }

                this.browserStorageSvc.LoadLocalStorage(input.obj.email, this.entidad, habilitado, this.newId, false);

                // Redirecciono al Home
                this.router.navigate(['Home']);
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
          // Implementacion usuario con ese mail ya existe (en realidad lo estaria validando en el forms)
        } 
        console.log(err);
      });
  }

  SelectRegistro(entidad: string)
  {
    this.entidad = entidad;
    let otraEntidad;

    if(entidad == "Paciente")
    {
      otraEntidad = "Profesional";
    }
    else
    {
      otraEntidad = "Paciente";
    }
    document.getElementById("btnSelect" + entidad).classList.value = "btn btn-default";
    document.getElementById("btnSelect" + otraEntidad).classList.value = "btn btn-primary";
  }
}
