import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccessService } from '../access.service';
import { UsuariosService } from '../../Usuarios/Usuario/usuarios.service';
import { BrowserStorageService } from '../browser-storage.service';
import { CaptchaService } from '../../Shared/Servicios/captcha.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorLogin ="";

  email: string;
  pass: string;
  remember = false;
  captchaOk = false;

  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  constructor(public accessSvc: AccessService,
              private usuariosSvc: UsuariosService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router,
              private captchaSvc: CaptchaService) {}

  ngOnInit(): void {
    this.addRecaptchaScript();
    this.browserStorageSvc.CleanLocalStorage();
    document.onkeyup = function(e) {
      if (e.ctrlKey && e.altKey && e.which == 190) {
        document.getElementById("btnModalHardcodeo").click();
      }
    };
  }

  tryLogin(input: NgForm)
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
  }

  addRecaptchaScript() {
    window['grecaptchaCallback'] = () => {
      this.renderReCaptcha();
    }
   
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
  }

  renderReCaptcha() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6LcDjgAVAAAAAAUaVj-uJLzSJZTIBs2YVXDCSAFe',
      'callback': (response) => {
          this.validarResponseCaptcha(response);
      }
    });
  }

  validarResponseCaptcha(response: string)
  {
    this.captchaOk = true;
    /*this.captchaSvc.validarGoogleCaptcha(response).subscribe(res => {
      console.log(JSON.stringify(res));
    }, error => {
      console.log(error);
    });*/
  }

  SaltearCaptcha()
  {
    this.captchaOk = true;
  }
}


