import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  /*GetUsuario(email: string)
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

  Update(id: string, newEmail: string) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(id).set({
      email: newEmail
    },
    {
      merge: true
    });
  }*/
}
