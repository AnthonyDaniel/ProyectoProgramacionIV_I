import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../Models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { 

  }
  
  saveV(data) {
    return this.http.post(`${this.baseUrl}/savev`, data);
  }
  getV(){
    return this.http.get<Vehicle[]>(`${this.baseUrl}/getv`);
  }
  updateV(data) {
    return this.http.put(`${this.baseUrl}/updatev`, data);
  }
  deleteV(id) {
    return this.http.delete(`${this.baseUrl}/deletev/${id}`);
  }
}
