import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  readonly collectionName = "Especialidades";

  constructor(private fireStore: AngularFirestore) { }

  Get()
  {
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }

  Insert(id: number, nombre: string) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(id.toString()).set({
      nombre: nombre
    });
  }
}