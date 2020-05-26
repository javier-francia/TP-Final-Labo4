import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../Access/access.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  perfil: string;

  constructor(private accessSvc: AccessService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.accessSvc.ValidateLocalStorage())
    {
      this.perfil = this.accessSvc.GetPerfil();
      console.log(this.perfil);
    }
  }

  LogOut()
  {
    this.accessSvc.LogOut()
      .then(() => {
        this.accessSvc.CleanLocalStorage();
        this.router.navigate(['']);
      })
      .catch();
  }

}
