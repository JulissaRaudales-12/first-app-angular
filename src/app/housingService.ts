import { Injectable } from '@angular/core';
import { HousingLocationInfo } from './housinglocation';  
import axios from 'axios';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HousingService {
  /*
  housingLocationList: HousingLocationInfo[] = [
      {
        id: 8,
        name: 'Seriously Safe Towns',
        city: 'Oakland',
        state: 'CA',
        photo: '/assets/saru-robert-9rP3mxf8qWI-unsplash.jpg',
        availableUnits: 10,
        wifi: false,
        laundry: false
      },
      {
        id: 9,
        name: 'Capital Safe Towns',
        city: 'Portland',
        state: 'OR',
        photo: '/assets/webaliser-_TPTXZd9mOo-unsplash.jpg',
        availableUnits: 6,
        wifi: true,
        laundry: true
      }
  ]
  */
 
  //url = 'http://localhost:3000/locations';
  private url = 'http://localhost:5285/api/'; //URL del endpoint de la API creada en .NET Core

  /*
  //functions:
  getAllHousingLocations(): HousingLocationInfo[] {

    return this.housingLocationList;
  }

  getHousingLocationById(id: number): HousingLocationInfo | undefined {
    return this.housingLocationList.find((housingLocation) => housingLocation.id === id);
  }
  */

  //2. Funcion para llamar endpoint o URL de la API con AXIOS:
  traerDatosAxios(){
    return axios.get(this.url+'Location')
  }

  /*async traerDatosAxios(): Promise<AxiosResponse<HousingLocationInfo[]>> {
  return axios.get<HousingLocationInfo[]>(this.url+'Location');
}*/

  eliminarDatoAxios(id: number) {
  // Retornamos la promesa de axios directamente
    return axios.delete(`${this.url}Location/${id}`);
  }

  crearDatoAxios(data: any){
    return axios.post(`${this.url}Location`, data);
  }

  getHousingLocationByIdAxios(id: number){
    return axios.get(`${this.url}Location/${id}`)
  }
  
/*
  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  
  getAllHousingLocations(): Observable<any[]> {
    // Axios devuelve una Promesa, 'from' de RxJS la convierte en un Observable
    const promise = axios.get<any[]>(this.url);
    return from(promise.then(response => response.data));
  }  
*/
  async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
    const data = await fetch(`${this.url}?id=${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};
  } 
   

  //Method:
  submitApplication(firstName: string, lastName: string, email: string) {
    
    /*
    console.log(  
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
    */

    console.log(firstName, lastName, email);

  }

}
