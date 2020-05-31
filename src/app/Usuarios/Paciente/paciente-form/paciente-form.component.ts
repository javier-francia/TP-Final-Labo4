import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paciente } from '../paciente';
import { Upload } from '../../../Shared/upload';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {
  modo = "insert";  // insert - edit
  usuario: Paciente;
  password: string;

  validExtensions = [
    "jpg",
    "jpeg",
    "png"
  ];

  img1: Upload;
  img2: Upload;
  
  @Input() editarUsuario: Paciente;
  @Output() registrarUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.usuario = new Paciente();
   }

  ngOnInit(): void {
    if(this.editarUsuario !== null && this.editarUsuario !== undefined)
    {
      this.modo = "edit";
      this.usuario = this.editarUsuario;
    }
  }

  Registrar_OnClick()
  {
    this.registrarUsuario.emit({
      obj: this.usuario,
      password: this.password,
      img1: this.img1,
      img2: this.img2
    });
  }

  DetectFiles(event)
  {
    let extension = this.ValidarExtension(event.target.files.item(0).name);
    if(extension !== null)
    {
      if(event.target.id === "img1")
      {
        this.img1 = new Upload(event.target.files.item(0));
        this.img1.extension = extension;
      }
      else if(event.target.id === "img2")
      {
        this.img2 = new Upload(event.target.files.item(0));
        this.img2.extension = extension;
      }
    }
    else
    {
      // Error de extension
    }
  }

  ValidarExtension(fileName: string) : string
  {
      let separateFileName = fileName.split(".");
      let extension = separateFileName[separateFileName.length - 1]

      if(this.validExtensions.includes(extension)) return extension;
      else return null;
  }

}
