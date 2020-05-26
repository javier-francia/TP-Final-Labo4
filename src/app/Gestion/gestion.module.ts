import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NavegacionModule } from '../Navegacion/navegacion.module';

import { PerfilGuard } from '../Usuarios/perfil.guard';

import { TurnoSolicitarComponent } from './Turno/turno-solicitar/turno-solicitar.component';
import { TurnoListadoComponent } from './Turno/turno-listado/turno-listado.component';
import { TurnoDetalleComponent } from './Turno/turno-detalle/turno-detalle.component';
import { InformeAltaComponent } from './Informe/informe-alta/informe-alta.component';
import { InformeDetalleComponent } from './Informe/informe-detalle/informe-detalle.component';
import { EncuestaAltaComponent } from './Encuesta/encuesta-alta/encuesta-alta.component';
import { EncuestaDetalleComponent } from './Encuesta/encuesta-detalle/encuesta-detalle.component';
import { AdmisionProfesionalesComponent } from './Administracion/admision-profesionales/admision-profesionales.component';
import { GestionAdministradoresComponent } from './Administracion/gestion-administradores/gestion-administradores.component';
import { AtenderPacienteComponent } from './Turno/atender-paciente/atender-paciente.component';

const routes: Routes = [
  {path: 'AtenderPaciente', component: AtenderPacienteComponent, canActivate: [PerfilGuard] },
  {path: 'PedirTurno', component: TurnoSolicitarComponent, canActivate: [PerfilGuard] },
  {path: 'AdminProfesionales', component: AdmisionProfesionalesComponent, canActivate: [PerfilGuard] },
  {path: 'AdministradoresABM', component: GestionAdministradoresComponent, canActivate: [PerfilGuard] },
];

@NgModule({
  declarations: [
    TurnoSolicitarComponent,
    TurnoListadoComponent,
    TurnoDetalleComponent,
    InformeAltaComponent,
    InformeDetalleComponent,
    EncuestaAltaComponent,
    EncuestaDetalleComponent,
    AdmisionProfesionalesComponent,
    GestionAdministradoresComponent,
    AtenderPacienteComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavegacionModule,
  ]
})
export class GestionModule { }
