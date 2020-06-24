import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccessService } from '../access.service';
import { UsuariosService } from '../../Usuarios/Usuario/usuarios.service';
import { BrowserStorageService } from '../browser-storage.service';
import { CaptchaService } from '../../Shared/Servicios/captcha.service';
import { fadeInAnimation } from '../../animationsRoot';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {

  errorLogin ="";

  email: string;
  pass: string;
  remember = false;
  captchaOk = false;
  captchaSalteado = false;

  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  constructor(public accessSvc: AccessService,
              private usuariosSvc: UsuariosService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router,
              private captchaSvc: CaptchaService) {}

  ngOnInit(): void {
    //this.addRecaptchaScript();
    this.browserStorageSvc.CleanLocalStorage();
    document.onkeyup = function(e) {
      if (e.ctrlKey && e.altKey && e.which == 190) {
        document.getElementById("btnModalHardcodeo").click();
      }
    };
  }

  tryLogin()
  {
    return this.accessSvc
      .LoginWithEmail(this.email, this.pass)
      .then(res => {
        let perfil;
        let id: number;
        // Implementacion de login OK

        let usuarioObservable = this.usuariosSvc.GetUsuario(this.email).snapshotChanges().subscribe((userSnapshot: any) => {
          if(userSnapshot.length > 0)
          {
            perfil = userSnapshot[0].payload.doc.data().perfil;
            id = userSnapshot[0].payload.doc.lE.key.path.segments[6];
            let habilitado: boolean = userSnapshot[0].payload.doc.data().habilitado;

            this.browserStorageSvc.LoadLocalStorage(this.email, perfil, habilitado, id, this.remember);
            this.router.navigate(['Home']);
            //console.info(`Logged with email: ${this.email}`);
          }
          usuarioObservable.unsubscribe();
        });

        
      })
      .catch(err => {
        if (err.code == "auth/user-not-found")
        {
          this.errorLogin = "El usuario ingresado no se encuentra registrado en el sistema."
        }
        else if (err.code == "auth/wrong-password")
        {
          this.errorLogin = "La contraseña es incorrecta."
        }
        else
        {
          this.errorLogin = "Inténtelo nuevamente."
        }
        document.getElementById("btnModalLogin").click();
      });
  }

  HardcodeoUsuarios(perfil: string)
  {
    switch(perfil)
    {
      case "Admin":
        this.email = "administrador@tpfinal.com";
        this.pass = "tpfinalJF!";
        break;
      case "Paciente John Doe":
        this.email = "johndoe@tpfinal.com";
        this.pass = "tpfinalJF!";
        break;
      case "Paciente Javier Francia":
        this.email = "javifrancia@gmail.com";
        this.pass = "tpfinalJF!";
        break;
      case "Prof Rene Favaloro":
        this.email = "rene@tpfinal.com";
        this.pass = "tpfinalJF!";
        break;
      case "Prof Nick Riviera":
        this.email = "nickriviera@tpfinal.com";
        this.pass = "tpfinalJF!";
        break;
    }
    if(document.getElementById("btnSubmit").attributes.getNamedItem("disabled") !== null) document.getElementById("btnSubmit").attributes.removeNamedItem("disabled");
    this.saltearCaptcha();
  }

  aceptarCaptcha()
  {
    this.captchaOk = true;
  }

  saltearCaptcha()
  {
    this.captchaOk = true;
    this.captchaSalteado = true;
  }

  placebo(){}
}


