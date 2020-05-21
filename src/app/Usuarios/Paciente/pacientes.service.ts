import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Paciente } from './paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  
  readonly collectionName = "Pacientes";

  constructor(private fireStore: AngularFirestore) { }

  Get()
  {
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }

  Insert(item: Paciente) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).set({
      nombre: item.nombre,
      apellido: item.apellido,
      email: item.email,
      img1: item.img1,
      img2: item.img2
    });
  }

  Update(item: Paciente) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).set({
      nombre: item.nombre,
      apellido: item.apellido,
      email: item.email,
      img1: item.img1,
      img2: item.img2
    },
    {
      merge: true
    });
  }

  Delete(item: Paciente) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).delete();
  }
}
