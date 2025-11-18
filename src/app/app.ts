import {Component} from '@angular/core';
//import { Home } from './home/home';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  //[Home..]
  imports: [RouterModule, RouterLink, RouterOutlet],
  template: `
    <main>
    <!--a [routerLink]="['/details', { housingLocation: 'id' }]">Learn More</a-->
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <!--Replacing: app-home></app-home...por:-->
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'homes';
}
