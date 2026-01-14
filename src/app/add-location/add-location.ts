import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housingService';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

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

  dataToSendForm: FormGroup = new FormGroup({});

  constructor(private nuevaCasa: HousingService, private builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.dataToSendForm = this.builder.group({
      id: [0, [Validators.required, Validators.min(0)]],
      name: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      photo: [''],
      availableUnits: [1, [Validators.required, Validators.min(0)]],
      wifi: [false],
      laundry: [false]
    });
  }

  async Onsubmit() {
  if (this.dataToSendForm.invalid) {
      alert('Formulario inválido');
      return;
    }

  // Enviamos el value completo (incluyendo el ID que escribió el usuario)
    const dataToSend = this.dataToSendForm.value;

    try {
      await this.nuevaCasa.crearDatoAxios(dataToSend);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error:', error);
    }
  }

}
