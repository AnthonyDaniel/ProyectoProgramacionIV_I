import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JarwisService {
  private baseUrl = 'https://avantiparkingbackend.000webhostapp.com/api/';

  httpHeaders = new HttpHeaders ({
    'Content-Type': 'application/json',
    "Authorization":localStorage.getItem("token")
  });

  constructor(private http: HttpClient) {
  }

  signup(data) {
    
    return this.http.post(`${this.baseUrl}signup?`+data,"")
  }

  login(data) {
    console.log(JSON.stringify(data));
    return this.http.post(`${this.baseUrl}login`,JSON.stringify(data)) 
  }

  me(data) {
    return this.http.post(`${this.baseUrl}me?token=`+data, "")
  }

  checkPassword(data) {
    return this.http.post(`${this.baseUrl}checkpassword`, data);
  }

  updated(data){
    return this.http.post(`${this.baseUrl}updaten`, data, {headers: this.httpHeaders});
  }

  deleteUser(data) {
    return this.http.post(`${this.baseUrl}delete?token=`+data, "")
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}sendPasswordResetLink`, data)
  }
  
  changePassword(data) {
    return this.http.post(`${this.baseUrl}resetPassword`, data)
  }

  uploadImg(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}upload`, data)
  }

}
