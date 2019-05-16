import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  
  save(data) {
    return this.http.post(`${this.baseUrl}/save`, data);
  }

  

}
