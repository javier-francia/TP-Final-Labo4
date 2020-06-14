import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animationsRoot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'javier-francia-tp-final';


  /*prepareRoute(outlet: RouterOutlet)
  {
    //console.log(outlet.activatedRoute);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }*/
}
