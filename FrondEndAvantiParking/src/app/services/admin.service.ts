import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {

  }

  registerUser(data: any) {
    return this.http.post(`${this.baseUrl}/registeru`, data)
  }
  getUser() {
    return this.http.get(`${this.baseUrl}/getusers`)
  }

}
