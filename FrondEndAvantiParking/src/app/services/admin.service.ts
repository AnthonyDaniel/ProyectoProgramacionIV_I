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
  deleteUser(data){
    return this.http.post(`${this.baseUrl}/deleteu`, data)
  }
  adminUser(data){
    return this.http.post(`${this.baseUrl}/adminu`, data)
  }
  registerSede(data){
    return this.http.post(`${this.baseUrl}/registers`, data)
  }
  getSede(){
    return this.http.get(`${this.baseUrl}/getsedes`)
  }
  modifySede(data){
    return this.http.post(`${this.baseUrl}/modifys`, data)
  }
  deleteSede(data){
    return this.http.post(`${this.baseUrl}/deletes`, data)
  }
}
