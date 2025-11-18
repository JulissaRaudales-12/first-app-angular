import { Component, Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HousingLocationInfo} from '../housinglocation';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-housing-location',
  imports: [CommonModule, RouterModule],
  template: `
    <section class= "listing">
<!--tiene que ser del tipo de clase que se input, pero a su vez se declara en el export que sigue el tipo interface-->
<!--text interpolation {}-->
      <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
      <h2 class="listing-heading">{{housingLocation.city}}</h2>
        <p class="listing-location">{{housingLocation.state}}</p>
        <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrl: `./housing-location.css`
})

export class HousingLocation {
    @Input() housingLocation!: HousingLocationInfo;
}
