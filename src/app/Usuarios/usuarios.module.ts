//            External Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NavegacionModule } from '../Navegacion/navegacion.module';

import { PerfilGuard } from './perfil.guard';

//            Components
import { AdminFormComponent } from './Admin/admin-form/admin-form.component';
import { AdminListadoComponent } from './Admin/admin-listado/admin-listado.component';
import { ProfesionalFormComponent } from './Profesional/profesional-form/profesional-form.component';
import { ProfesionalListadoComponent } from './Profesional/profesional-listado/profesional-listado.component';
import { PacienteFormComponent } from './Paciente/paciente-form/paciente-form.component';
import { PacienteListadoComponent } from './Paciente/paciente-listado/paciente-listado.component';
import { PacienteHistorialComponent } from './Paciente/paciente-historial/paciente-historial.component';
import { MiPerfilComponent } from './Usuario/mi-perfil/mi-perfil.component';
import { ProfesionalDetalleComponent } from './Profesional/profesional-detalle/profesional-detalle.component';
import { ProfesionalAgendaComponent } from './Profesional/profesional-agenda/profesional-agenda.component';
import { PacienteTurnosComponent } from './Paciente/paciente-turnos/paciente-turnos.component';



const routes: Routes = [
  {path: 'Historial', component: PacienteHistorialComponent, canActivate: [PerfilGuard] },
  {path: 'MiPerfil', component: MiPerfilComponent },
  {path: 'Agenda', component: ProfesionalAgendaComponent, canActivate: [PerfilGuard] },
  {path: 'MisTurnos', component: PacienteTurnosComponent, canActivate: [PerfilGuard] },
];

@NgModule({
  declarations: [
    AdminFormComponent,
    AdminListadoComponent,
    ProfesionalFormComponent,
    ProfesionalListadoComponent,
    PacienteFormComponent,
    PacienteListadoComponent,
    PacienteHistorialComponent,
    MiPerfilComponent,
    ProfesionalDetalleComponent,
    ProfesionalAgendaComponent,
    PacienteTurnosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NavegacionModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    AdminFormComponent,
    PacienteFormComponent,
    ProfesionalFormComponent
  ]
})
export class UsuariosModule { }
