import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HousingLocationInfo} from '../housinglocation';
import { RouterModule } from '@angular/router';
import { HousingService } from '../housingService'; // importar el servicio para usar el delete ..


@Component({
  selector: 'app-housing-location',//CARD********//DELETE
  imports: [CommonModule, RouterModule],
  template: `
    <section class= "listing">
<!--tiene que ser del tipo de clase que se input, pero a su vez se declara en el export que sigue el tipo interface-->
<!--text interpolation {}-->
      <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
      <h2 class="listing-heading">{{housingLocation.city}}</h2>
        <p class="listing-location">{{housingLocation.state}}</p>
      
        <div class="listing-footer">
          <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
          <button class="delete-button" (click)="onDelete()">Eliminar</button>
        </div>
    </section>
  `,
  styleUrl: `./housing-location.css`
})

export class HousingLocation {
    @Input() housingLocation!: HousingLocationInfo;
    @Output() remove = new EventEmitter<number>();

    // Importa tu servicio en el constructor para el onDelete.
    constructor(private housingService: HousingService) {}

    async onDelete() {
      if (confirm('¿Eliminar este registro?')) {
        try {
          // Llamamos al método del servicio
          await this.housingService.eliminarDatoAxios(this.housingLocation.id);
          // Solo avisamos al padre: "Oye, borré el ID X, actualiza tus listas"
          // Si la línea de arriba tiene éxito, avisamos al padre
          this.remove.emit(this.housingLocation.id); //REMOVE es un EventBinding (remove) que hay que añadir al HTML para que renderice

        } catch (error) {
          console.error('Error al borrar:', error);
          alert('Hubo un error al eliminar en el servidor');
        }
      }
    }
}
