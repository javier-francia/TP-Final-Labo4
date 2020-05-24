import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../access.service';
import { UsuariosService } from '../../Usuarios/usuarios.service';
import { AdministradoresService } from '../../Usuarios/Admin/administradores.service';
import { PacientesService } from '../../Usuarios/Paciente/pacientes.service';
import { ProfesionalesService } from '../../Usuarios/Profesional/profesionales.service';
import { Paciente } from '../../Usuarios/Paciente/paciente';
import { Profesional } from '../../Usuarios/Profesional/profesional';
import { Admin } from '../../Usuarios/Admin/admin';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  entidad = "Paciente";
  newId: number;

  constructor(public accessSvc: AccessService,
              private usuariosSvc: UsuariosService,
              private adminSvc: AdministradoresService,
              private pacientesSvc: PacientesService,
              private profesionalesSvc: ProfesionalesService,
              private router: Router) { }

  ngOnInit(): void {
    let idSetter = this.usuariosSvc.Get().subscribe(usuariosSnapshot => {
      this.newId = usuariosSnapshot.length + 1;
      console.log(this.newId);
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
            this.usuariosSvc.Insert(this.newId, input.obj.email, this.entidad)
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
                      paciente.id = this.newId; paciente.nombre = input.obj.nombre; paciente.apellido = input.obj.apellido;
                      paciente.email = input.obj.email; paciente.perfil = this.entidad; paciente.img1 = input.obj.img1; paciente.img2 = input.obj.img2;
                      this.pacientesSvc.Insert(paciente);
                    }
                    break;
                  case "Profesional":
                    {
                      let profesional = new Profesional();
                      profesional.id = this.newId; profesional.nombre = input.obj.nombre; profesional.apellido = input.obj.apellido;
                      profesional.email = input.obj.email; profesional.perfil = this.entidad; profesional.especialidades = input.obj.especialidades;
                      this.profesionalesSvc.Insert(profesional);
                    }
                    break;
                  case "Admin":
                    {
                      let admin = new Admin();
                      admin.id = this.newId; admin.nombre = input.obj.nombre; admin.apellido = input.obj.apellido;
                      admin.email = input.obj.email; admin.perfil = this.entidad; admin.superUser = false;
                      this.adminSvc.Insert(admin);
                    }
                    break;
                }

                this.accessSvc.LoadLocalStorage(input.obj.email, this.entidad);

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
}
