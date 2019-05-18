import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  updateV(data) {
    return this.http.post(`${this.baseUrl}/updateV`, data);
  }
  deleteV(data) {
    return this.http.post(`${this.baseUrl}/deleteV`, data);
  }
}
