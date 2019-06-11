import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../Models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'https://avantiparkingbackend.000webhostapp.com/api';

  constructor(private http: HttpClient) { 

  }
  
  saveV(data) {
    return this.http.post(`${this.baseUrl}/savev`, data);
  }
  getV(data){
    return this.http.post(`${this.baseUrl}/getv`, data);
  }
  updateV(data) {
    return this.http.post(`${this.baseUrl}/updatev`, data);
  }
  deleteV(data) {
    return this.http.post(`${this.baseUrl}/deletev`,data);
  }
}
