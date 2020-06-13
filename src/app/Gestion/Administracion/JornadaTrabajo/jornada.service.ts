import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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
}
