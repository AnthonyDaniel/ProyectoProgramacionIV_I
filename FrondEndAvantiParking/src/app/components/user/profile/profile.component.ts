import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { AuthorizationAdminService } from 'src/app/services/authorization-admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public cerrar = "";

  public form={
    email:null,
    password: null,
  };

  public modifyNombre={
    email:null,
    nombre:null,
    password:null,
  };

  public modifyID={
    email:null,
    id:null,
    password:null,
  };

  public modifyAddress={
    email:null,
    direccion:null,
    password:null,
  }

  public modifyPhone={
    email:null,
    telefono:null,
    password:null,
  }


  public dataUser = {
    nombre: null,
    email: null,
    id: null,
    imagen: null,
    direccion: null,
    telefono: null,
    tipo: null
  };

  constructor(
    private Jarwis: JarwisService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService,
    private admin: AuthorizationAdminService,
  ) { 
  }

  ngOnInit() {
    this.Jarwis.me(this.token.get()).subscribe(
      data => this.data(data),
      error => console.log(error)
    )   
  }
  
  data(data){
    this.dataUser.nombre = data.nombre;
    this.dataUser.email = data.email;
    this.dataUser.id = data.id;
    this.dataUser.imagen = data.imagen;
    this.dataUser.direccion = data.direccion;
    this.dataUser.telefono = data.telefono;
    this.dataUser.tipo = data.tipo;
  }


  modifyName(){
    $('#closeModalN').click();
    this.modifyNombre.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.modifyNombre).subscribe(
      data => {this.Jarwis.updatedName(this.modifyNombre).subscribe(
        data => this.dataUser.nombre = this.modifyNombre.nombre,
        error => console.log(error)
      )},
      error => console.log(error)
    );
  }

  modifyId(){
    $('#closeModalI').click();
    this.modifyID.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.modifyID).subscribe(
      data => {this.Jarwis.updatedName(this.modifyID).subscribe(
        data => this.dataUser.id = this.modifyID.id,
        error => console.log(error)
      )},
      error => console.log(error)
    );
  }

  modifyADDRESS(){
    $('#closeModalA').click();
    this.modifyAddress.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.modifyAddress).subscribe(
      data => {this.Jarwis.updatedName(this.modifyAddress).subscribe(
        data => this.dataUser.direccion = this.modifyAddress.direccion,
        error => console.log(error)
      )},
      error => console.log(error)
    );
  }

  modifyPHONE(){
    $('#closeModalP').click();
    this.modifyPhone.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.modifyPhone).subscribe(
      data => {this.Jarwis.updatedName(this.modifyPhone).subscribe(
        data => this.dataUser.telefono = this.modifyPhone.telefono,
        error => console.log(error)
      )},
      error => console.log(error)
    );
  }

  deleteAccount() {
    this.form.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.form).subscribe(
      data => this.delete(),
      error => console.log(error)
    );
    }
    
    delete(){
      this.Jarwis.deleteUser(this.token.get()).subscribe(
        data => this.responseDeleteSuccess(),
        error => this.responseDeleteError(error)
      );
    }

    responseDeleteSuccess(){
      this.token.remove();
      $('#closeModal').click();
      this.auth.changeAuthStatus(false);
      this.router.navigateByUrl('');
    }

    responseDeleteError(error){
      console.log(error);
    }

}
