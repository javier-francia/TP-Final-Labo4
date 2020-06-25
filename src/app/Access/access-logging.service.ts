import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AccessLog } from './access-log';

@Injectable({
  providedIn: 'root'
})
export class AccessLoggingService {

  readonly collectionName = "Log_Acceso";

  constructor(private fireStore: AngularFirestore) { }

  Get()
  {
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }

  Insert(unLog: AccessLog) : Promise<DocumentReference>
  {
    return this.fireStore.collection(this.collectionName).add({
      idUsuario: unLog.idUsuario,
      email: unLog.email,
      datetime: unLog.datetime,
      perfil: unLog.perfil
    });
  }
}
