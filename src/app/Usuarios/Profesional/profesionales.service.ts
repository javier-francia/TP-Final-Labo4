import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profesional } from './profesional';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {
  
  readonly collectionName = "Profesionales";

  constructor(private fireStore: AngularFirestore) { }

  Get()
  {
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }

  Insert(item: Profesional) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).set({
      nombre: item.nombre,
      apellido: item.apellido,
      email: item.email,
      especialidades: item.especialidades
    });
  }

  Update(item: Profesional) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).set({
      nombre: item.nombre,
      apellido: item.apellido,
      email: item.email,
      especialidades: item.especialidades
    },
    {
      merge: true
    });
  }

  Delete(item: Profesional) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).delete();
  }
}
