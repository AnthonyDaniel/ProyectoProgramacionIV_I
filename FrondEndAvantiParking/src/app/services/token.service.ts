import { Injectable } from '@angular/core';
import { JarwisService } from './jarwis.service';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  };

  public dataT = null;
  public response = false;

  constructor(private Jarwis: JarwisService) {
    this.Jarwis.me(this.get()).subscribe(data => { this.dataT = data;});
  }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }
  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      console.log(payload);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) >= -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    
    return this.isValid();
  }
  admin(){
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      console.log(payload);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) >= -1 ? true : false;
      }
    }
    return false;
  }
  rolV(): boolean {
    try{
      if (this.dataT.tipo == null || this.dataT.tipo == 0) {
        return false;
      } else {
        return true;
      }
    }catch(Exception){
      return false;
    }

  }
}
