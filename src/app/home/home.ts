import { Component, inject, OnInit } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { CommonModule} from "@angular/common";
import { HousingService } from '../housingService';
import { RouterLink} from '@angular/router'

@Component({
  selector: 'app-home',
  imports: [HousingLocation, CommonModule, RouterLink],
  template: `
    <section class="search-section">
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>

      <div class="add-action-wrapper">
        <a [routerLink]="['/add']" class="add-button">+ Add New Location</a>
      </div>
    </section>

    <section class="results">
      <!--El nuevo *ngFor: en bloque bajo llaves-->
      @for(housingLocation of filteredLocationList; track $index){
<!--Property binding []-->
      <app-housing-location [housingLocation]="housingLocation" (remove)="actualizarLista($event)"></app-housing-location>
    }
    </section>
  `,
  styleUrl: './home.css'
})

//export class Home implements OnInit { //Estes es PADREEEEE, housing-location es HIJOOOOOOOOOO***************************
export class Home implements OnInit{
  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);

  filteredLocationList: HousingLocationInfo[] = [];

  constructor() {}
/*
  ngOnInit(): void {
    this.housingService.getAllHousingLocations().subscribe({
      next: (data) => {
        this.housingLocationList = data;
        this.filteredLocationList = data;
        console.log('Datos recibidos mediante Observable');
      },
      error: (error) => {
        console.error('Error al llamar el API:', error);
      }
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
  }*/

//}

  //constructor(housingService: HousingService) {}
    /* SYNCRONIC VERSIOOOON!!!!!
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;  

    ASYNC:
    server now reading data from the HTTP request, and components rely on the service 
    
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocationInfo[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });*/
    
      // LOGICA DENTRO DEL CONSTRUCTOR
    
    ngOnInit(): void {
      this.housingService.traerDatosAxios().then(response=> {
          this.housingLocationList = response.data; //Se reciben los datos
         // this.filteredLocationList = this.housingLocationList;
         this.filteredLocationList = [...this.housingLocationList];
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

  actualizarLista(id: number) {
  // 1. Actualizamos- Filtramos la lista principal
    this.housingLocationList = this.housingLocationList.filter(
      (item) => item.id !== id
    );

    // REUTILIZACIÓN: En lugar de escribir otro filter, simplemente vuelve a ejecutar tu buscador con el texto que ya había.
    // Si no hay texto, pasamos un string vacío para que muestre todo lo que queda.
    //2. Refrescamos la lista filtrada
    this.filteredLocationList = [...this.housingLocationList];
    //this.filterResults(''); 
  }

  onNewLocation(newLocation: HousingLocationInfo) {
  // Añadimos el nuevo objeto al inicio de los arreglos
    this.housingLocationList = [newLocation, ...this.housingLocationList];
    this.filteredLocationList = [newLocation, ...this.filteredLocationList];
  }
}


