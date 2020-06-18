import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  readonly collectionName = "Usuarios";

  constructor(private fireStore: AngularFirestore) { }

  Get()
  {
    //return this.fireStore.collection<Usuario>(this.collectionName).snapshotChanges();
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }

  GetUsuario(email: string)
  {
    return this.fireStore.collection(this.collectionName, ref => ref.where('email', '==', email));
  }

  Insert(id: number, email: string, perfil: string, habilitado: boolean) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(id.toString()).set({
      email: email,
      perfil: perfil,
      habilitado: habilitado
    });
  }

  UpdateEmail(id: string, newEmail: string) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(id).set({
      email: newEmail
    },
    {
      merge: true
    });
  }

  UpdateHabilitado(id: number, habilitado: boolean) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(id.toString()).set({
      habilitado: habilitado
    },
    {
      merge: true
    });
  }
}
