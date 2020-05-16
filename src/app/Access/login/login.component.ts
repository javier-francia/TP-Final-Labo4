import { Component, OnInit } from '@angular/core';
import { AccessService } from '../access.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  pass: string;

  constructor(public accessService: AccessService,
              private router: Router) {}

  ngOnInit(): void {
  }

  tryLogin(input: NgForm)
  {
    return this.accessService
      .LoginWithEmail(this.email, this.pass)
      .then(res => {
        // Implementacion de login OK
        this.router.navigate(['Home']);
        console.info(`Logged with email: ${this.email}`);
      })
      .catch(err => {
        if (err.code == "auth/user-not-found")
        {
          // Implementacion no encontro usuario
        }
        else if (err.code == "auth/wrong-password")
        {
          // Implementacion contraseña incorrecta
        }
        console.error(err);
      });
  }

}
