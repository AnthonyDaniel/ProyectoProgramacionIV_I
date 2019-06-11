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
  registerParking(data){
    return this.http.post(`${this.baseUrl}/registerp`, data)
  }
  getParqueo(){
    return this.http.get(`${this.baseUrl}/getparqueo`)
  }
  deleteParking(data){
    return this.http.post(`${this.baseUrl}/deletep`, data)
  }
  modifyParking(data){
    return this.http.post(`${this.baseUrl}/modifyp`, data)
  } 
  getSpace(data){
    return this.http.post(`${this.baseUrl}/getspace`, data)
  } 
  modifySpace(data){
    return this.http.post(`${this.baseUrl}/mspace`, data)
  }
  deleteSpace(data){
    return this.http.post(`${this.baseUrl}/dspace`, data)
  }
  //-----------------------------
  addReserve(data){
    return this.http.post(`${this.baseUrl}/addr`, data)
  }
  listReserve(data){
    return this.http.post(`${this.baseUrl}/list`, data)
  }
  deleteReserve(data){
    return this.http.post(`${this.baseUrl}/deleterr`, data)
  }

}
