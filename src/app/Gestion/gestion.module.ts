import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FusionChartsModule } from "angular-fusioncharts";

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
import { EstadoTurnoDirective } from '../Shared/estado-turno-directive';
import { DayNamePipe } from '../Shared/day-name-pipe';
import { TurnoBusquedaComponent } from './Turno/turno-busqueda/turno-busqueda.component';
import { AgregarEspecialidadComponent } from './Administracion/agregar-especialidad/agregar-especialidad.component';
import { OpcionUnoAComponent } from './Estadisticas/opcion-uno-a/opcion-uno-a.component';
import { OpcionUnoBComponent } from './Estadisticas/opcion-uno-b/opcion-uno-b.component';
import { OpcionDosAComponent } from './Estadisticas/opcion-dos-a/opcion-dos-a.component';
import { OpcionDosBComponent } from './Estadisticas/opcion-dos-b/opcion-dos-b.component';
import { OpcionDosCComponent } from './Estadisticas/opcion-dos-c/opcion-dos-c.component';



// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";





const routes: Routes = [
  {path: 'AtenderPaciente', component: AtenderPacienteComponent, canActivate: [PerfilGuard] },
  {path: 'PedirTurno', component: TurnoSolicitarComponent, canActivate: [PerfilGuard] },
  {path: 'AdminProfesionales', component: AdmisionProfesionalesComponent, canActivate: [PerfilGuard] },
  {path: 'Especialidades', component: AgregarEspecialidadComponent, canActivate: [PerfilGuard] },
  {path: 'JornadasLaborales', component: JornadaScreenComponent, canActivate: [PerfilGuard] },
  {path: 'BusquedaInformacion', component: TurnoBusquedaComponent, canActivate: [PerfilGuard] },
  {path: 'Estadistica1a', component: OpcionUnoAComponent, canActivate: [PerfilGuard] },
  {path: 'Estadistica1b', component: OpcionUnoBComponent, canActivate: [PerfilGuard] },
  {path: 'Estadistica2a', component: OpcionDosAComponent, canActivate: [PerfilGuard] },
  {path: 'Estadistica2b', component: OpcionDosBComponent, canActivate: [PerfilGuard] },
  {path: 'Estadistica2c', component: OpcionDosCComponent, canActivate: [PerfilGuard] },

];

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

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
    DayNamePipe,
    EstadoTurnoDirective,
    TurnoBusquedaComponent,
    AgregarEspecialidadComponent,
    OpcionUnoAComponent,
    OpcionUnoBComponent,
    OpcionDosAComponent,
    OpcionDosBComponent,
    OpcionDosCComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavegacionModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FusionChartsModule
  ],
  exports: [
    TurnoDetalleComponent,
    EncuestaAltaComponent,
    InformeDetalleComponent,
    EncuestaDetalleComponent,
    EstadoTurnoDirective
  ]
})
export class GestionModule { }
