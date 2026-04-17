import { Component, OnInit } from '@angular/core';
import { Validators, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housingService';
import { HousingLocationInfo } from '../housinglocation';

@Component({
  selector: 'app-edit-location',
  imports: [FormsModule],
  template: `
    <p>
      edit-location works!
    </p>
  `,
  styles: ``,
})

export class EditLocation implements OnInit {
  //Constructor para incluir el builder:
  constructor(private service: HousingService,private builder: FormBuilder, private route: ActivatedRoute) {} 

  //1er Variable:
  updateForm: FormGroup = new FormGroup({}); 
  //2nda Variable: (ID)
  //locationID!: number;
  locationID: any
  //3er Variable:
  locationDetails: any;

  //*****1. Inicializamos form 1 sola vez -----difer: es un UPDATE FORM*/
  async ngOnInit(): {
    

    //****2. Obtener ID de la ruta con el screen -Activated Route */
      this.locationDetails = response.data; 

      const response = await this.service.getHousingLocationByIdAxios(this.locationID);  

    //****4. Usamos Axios para traer los datos
    try{
      const response= this.route.snapshot.paramMap.get('id');
      //****3.  Cargar datos del empleado co Get de Axios */
      /*if (this.locationID) {
        this.service.getHousingLocationByIdAxios(this.locationID)
      }*/

    //****5. Llenar el formulario, No recrearloo */
    this.updateForm.actualizarDatoAxios()({
      name: this.locationDetails.name,
      city: this.locationDetails.city,
      state: this.locationDetails.state,
      photo: this.locationDetails.photo,
      availableUnits: this.locationDetails.availableUnits,
      wifi: this.locationDetails.wifi,
      laundry: this.locationDetails.laundry
    });

    } catch (error) {
      console.error('Error al obtener el detalle:', error);
    }  
  }
  
}
