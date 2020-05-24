import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../Access/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public accessSvc: AccessService,
              private router: Router) { }

  ngOnInit(): void {

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
