import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Jornada } from './jornada';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  readonly collectionName = "Profesional_Jornada";

  constructor(private fireStore: AngularFirestore) { }

  GetProfesionalJornada()
  {
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }

  UpdateJornadas(misJornadas: Array<Jornada>, idProfesionalJornada: number): Promise<void>
  {
    let arrayJornadasString = [];
    for(let i = 0; i < misJornadas.length; i++)
    {
      arrayJornadasString.push(JSON.stringify(misJornadas[i]));
    }
    
    return this.fireStore.collection(this.collectionName).doc(idProfesionalJornada.toString()).set({
      jornadas: arrayJornadasString
    },
    {
      merge: true
    });
  }

  Insert(idProfesionalJornada: number, idProfesional: number)
  {
    return this.fireStore.collection(this.collectionName).doc(idProfesionalJornada.toString()).set({
      id_profesional: idProfesional,
      jornadas: []
    });
  }
}
