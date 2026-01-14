import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housingService';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-location',
  // IMPORTANTE: Para usar [formGroup] necesitas ReactiveFormsModule, no FormsModule
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-location.html',
  styleUrl: './add-location.css',
})

export class AddLocation implements OnInit {
  // Importante añadir <HousingLocationInfo>
  @Output() locationCreated = new EventEmitter<HousingLocationInfo>();

  postForm: FormGroup = new FormGroup({});

  constructor(private nuevaCasa: HousingService, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.builder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      photo: [''],
      availableUnits: [1],
      wifi: [false],
      laundry: [false]
    });
  }

  async Onsubmit() {
  if (this.postForm.invalid) {
      alert('Formulario inválido');
      return;
    }

  // 1. Quitamos el ID para que la base de datos cree uno nuevo
  const { id, ...dataToSend } = this.postForm.value;

  try {
    // 2. Llamamos a tu método del servicio
    const response = await this.nuevaCasa.crearDatoAxios(dataToSend);

    // 3. Emitimos la respuesta (el objeto que ya tiene el ID del servidor)
    // Recuerda que en Axios los datos están en la propiedad .data
    this.locationCreated.emit(response.data);

    // 4. Limpiamos y cerramos
    this.postForm.reset();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }

}
