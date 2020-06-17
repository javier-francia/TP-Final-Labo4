import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Turno } from './turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosServiceService {

  readonly collectionName = "Turnos";

  constructor(private fireStore: AngularFirestore) { }

  Get()
  {
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }

  Insert(item: Turno): Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).set({
      idPaciente: item.idPaciente as number,
      idProfesional: item.idProfesional as number,
      nombreCompletoPaciente: item.nombreCompletoPaciente,
      nombreCompletoProfesional: item.nombreCompletoProfesional,
      especialidad: item.especialidad,
      inicio: item.inicio,
      fin: item.fin,
      estado: item.estado,
      resenia: "",
      datosPaciente: "",
      datosProfesional: ""
    });
  }

  UpdateEstado(unTurno: Turno) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(unTurno.id.toString()).set({
      estado: unTurno.estado
    },
    {
      merge: true
    });
  }

  UpdateAtencion(unTurno: Turno) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(unTurno.id.toString()).set({
      estado: unTurno.estado,
      resenia: unTurno.resenia,
      datosPaciente: JSON.stringify(unTurno.datosPaciente)
    },
    {
      merge: true
    });
  }
  
}
