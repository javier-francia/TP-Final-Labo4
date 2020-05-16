import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../access.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  pass: string;

  constructor(public accessService: AccessService,
              private router: Router) { }

  ngOnInit(): void {
  }

  tryRegister(input: NgForm)
  {
    return this.accessService
      .RegisterWithEmail(this.email, this.pass)
      .then(res => {
        // Implementacion de registro OK
        this.accessService.GetCurrentUser()
          .then(user => {
            user.sendEmailVerification()
              .then()
              .catch(err => {
                // Imple error al mandar email verificacion
              })
          })
          .catch(err => {
            // Imple error al obtener usuario actual
          })
        this.router.navigate(['Home']);
        console.log("Logged");
      })
      .catch(err => {
        if(err.code === "auth/email-already-in-use")
        {
          // Implementacion usuario con ese mail ya existe
        } 
        console.log(err);
      });
  }
}
