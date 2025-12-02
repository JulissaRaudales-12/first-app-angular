import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { CommonModule} from "@angular/common";
import { HousingService } from '../housingService';

@Component({
  selector: 'app-home',
  imports: [HousingLocation, CommonModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <!--El nuevo *ngFor: en bloque bajo llaves-->
      @for(housingLocation of filteredLocationList; track $index){
<!--Property binding []-->
      <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
    }
    </section>
  `,
  styleUrl: './home.css'
})

export class Home {
  housingLocationList: HousingLocationInfo[] = [];
  //housingService: HousingService = inject(HousingService);

  filteredLocationList: HousingLocationInfo[] = [];

  constructor(housingService: HousingService) {
    /* SYNCRONIC VERSIOOOON!!!!!
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;  

    ASYNC:
    server now reading data from the HTTP request, and components rely on the service 
    
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocationInfo[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });*/

     this.housingService.traerDatosAxios().then(response=> {
        this.housingLocationList = response.data; //Se reciben los datos
        this.filteredLocationList = this.housingLocationList;
      }).catch((error) => { console.log(error)})
      .finally(()=>{
        console.log('termina de llamar el API');
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }

}

