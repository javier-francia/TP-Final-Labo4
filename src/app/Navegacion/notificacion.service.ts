import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notificacion } from './notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  readonly collectionName = "Notificaciones";

  constructor(private fireStore: AngularFirestore) { }

  Get()
  {
    return this.fireStore.collection(this.collectionName).snapshotChanges();
  }

  Insert(unaNotificacion: Notificacion) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(unaNotificacion.id.toString()).set({
      idUsuario: unaNotificacion.idUsuario,
      fecha: unaNotificacion.fecha,
      contenido: unaNotificacion.contenido,
      leido: unaNotificacion.leido
    });
  }

  UpdateLectura(unaNotificacion: Notificacion) : Promise<void>
  {
    return this.fireStore.collection(this.collectionName).doc(unaNotificacion.id.toString()).set({
      leido: unaNotificacion.leido
    },
    {
      merge: true
    });
  }
}
