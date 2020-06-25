import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error404imgSrc = "../../../assets/img/error404.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
