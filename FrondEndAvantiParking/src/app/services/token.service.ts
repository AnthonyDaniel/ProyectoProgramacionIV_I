import { Injectable } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  };

  form = {
    tipo:null,
  };

  constructor(
    private Jarwis: JarwisService,
  ) {}

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

  rol(){
    this.Jarwis.me(this.get()).subscribe(
      data => this.data(data),
      error => console.log(error)
    );
  }

  data(data){
    return data.tipo;
  }
}
