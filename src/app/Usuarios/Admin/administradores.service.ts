import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  readonly collectionName = "Administradores";

  constructor(private fireStore: AngularFirestore) { }

  Get()
  {
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }

  Insert(item: Admin) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).set({
      nombre: item.nombre,
      apellido: item.apellido,
      email: item.email,
      superUser: item.superUser
    });
  }

  Update(item: Admin) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).set({
      nombre: item.nombre,
      apellido: item.apellido,
      email: item.email,
      superUser: item.superUser
    },
    {
      merge: true
    });
  }

  Delete(item: Admin) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(item.id.toString()).delete();
  }
}
