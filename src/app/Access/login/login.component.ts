import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccessService } from '../access.service';
import { UsuariosService } from '../../Usuarios/Usuario/usuarios.service';
import { BrowserStorageService } from '../browser-storage.service';
import { CaptchaService } from '../../Shared/Servicios/captcha.service';
import { fadeInAnimation } from '../../animationsRoot';
import { AccessLoggingService } from '../access-logging.service';
import { AccessLog } from '../access-log';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ fadeInAnimation ],
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {

  errorLogin ="";

  resetPassEmail = "";

  email: string;
  pass: string;
  remember = false;
  captchaOk = false;
  captchaSalteado = false;

  resetPassSent = false;
  errorPassSent = "";

  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  constructor(public accessSvc: AccessService,
              private usuariosSvc: UsuariosService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router,
              private captchaSvc: CaptchaService,
              private accessLoggingSvc: AccessLoggingService) {}

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
            id = +userSnapshot[0].payload.doc.id;
            let habilitado: boolean = userSnapshot[0].payload.doc.data().habilitado;

            //Agregar log
            let log = new AccessLog();
            log.idUsuario = id;
            log.email = this.email;
            log.datetime = new Date(Date.now());
            log.perfil = perfil;

            this.accessLoggingSvc.Insert(log).then().catch();

            this.browserStorageSvc.LoadLocalStorage(this.email, perfil, habilitado, id, this.remember);
            
            this.router.navigate(['Home']);
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
      case "Paciente Michael Jordan":
        this.email = "mjordan@tpfinal.com";
        this.pass = "tpfinalJF!";
        break;
      case "Paciente Juan Carr":
        this.email = "jcarr@tpfinal.com";
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
      case "Prof Juan Carlos Andreis":
        this.email = "jcandreis@tpfinal.com";
        this.pass = "adminJF!";
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

  Reseteo()
  {
    this.errorPassSent = "";
    
    this.accessSvc.ResetPassword(this.resetPassEmail).then(res => {
      this.resetPassSent = true;
    }).catch(err => {
      if(err.code == "auth/user-not-found")
      {
        this.errorPassSent = `No existe un usuario con el mail ${this.resetPassEmail}.`;
      }
      else
      {
        this.errorPassSent = `Error no controlado: ${err.code}.`;
      }
    });
  }

  OnForgotPass()
  {
    this.errorPassSent = "";
    this.resetPassEmail = "";
    document.getElementById("btnModalForgotPass").click();
  }

  placebo(){}
}


