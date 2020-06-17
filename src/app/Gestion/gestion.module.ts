import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { JornadaFormComponent } from './Administracion/JornadaTrabajo/jornada-form/jornada-form.component';
import { JornadaListComponent } from './Administracion/JornadaTrabajo/jornada-list/jornada-list.component';
import { JornadaScreenComponent } from './Administracion/JornadaTrabajo/jornada-screen/jornada-screen.component';

const routes: Routes = [
  {path: 'AtenderPaciente', component: AtenderPacienteComponent, canActivate: [PerfilGuard] },
  {path: 'PedirTurno', component: TurnoSolicitarComponent, canActivate: [PerfilGuard] },
  {path: 'AdminProfesionales', component: AdmisionProfesionalesComponent, canActivate: [PerfilGuard] },
  {path: 'AdministradoresABM', component: GestionAdministradoresComponent, canActivate: [PerfilGuard] },
  {path: 'JornadasLaborales', component: JornadaScreenComponent, canActivate: [PerfilGuard] },

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
    JornadaFormComponent,
    JornadaListComponent,
    JornadaScreenComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavegacionModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    TurnoDetalleComponent,
    EncuestaAltaComponent,
    InformeDetalleComponent
  ]
})
export class GestionModule { }
