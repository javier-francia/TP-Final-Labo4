import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Upload } from './upload';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor() { }

  private basePath: string = '/uploads';
  private uploadTask: firebase.storage.UploadTask;

  pushUpload(fileToUpload: Upload, fileName: string)
  {
    let logged = false;
    let storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${fileName}`).put(fileToUpload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snap) => {
      fileToUpload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;

      snap.task.then(() => {
          this.uploadTask.snapshot.ref.getDownloadURL()
          .then((download_url) => {
            if(!logged)
            {
              logged = true;
              fileToUpload.url = `${this.basePath}/${fileName}`;
            }
          })
          .catch();
      });

    }), (err) => {
             console.log(err);
      };
  }

  saveFileData(upload: Upload)
  {
    localStorage.setItem("uploaded", JSON.stringify(upload));
  }
}

