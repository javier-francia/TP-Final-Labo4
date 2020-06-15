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
      idPaciente: item.idPaciente,
      idProfesional: item.idProfesional,
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

  UpdateEstado(id: string, newEstado: string) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(id).set({
      estado: newEstado
    },
    {
      merge: true
    });
  }
  
}
