import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public urlImg='https://avantiparkingbackend.000webhostapp.com/api/avatar/';

  public cerrar = "";

  public image;

  public form = {
    email: null,
    password: null,
  };

  public modifyNombre = {
    email: null,
    nombre: null,
    password: null,
  };

  public modifyID = {
    email: null,
    id: null,
    tipo: null,
    password: null,
  };

  public modifyAddress = {
    email: null,
    direccion: null,
    password: null,
  }

  public modifyImage = {
    email: null,
    image: null,
    password: null,
  }

  public modifyPhone = {
    email: null,
    telefono: null,
    password: null,
  }


  public dataUser = {
    nombre: null,
    email: null,
    id: null,
    imagen: null,
    direccion: null,
    telefono: null,
    tipo: null,
    image:null
  };

  public error: String;
  public success: String;
  public status: String;

  constructor(
    private Jarwis: JarwisService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.Jarwis.me(this.token.get()).subscribe(
      data => this.data(data),
      error => this.responseError(error)
    )
  }

  data(data) {
    this.dataUser.nombre = data.nombre;
    this.dataUser.email = data.email;
    this.dataUser.id = data.id;
    this.dataUser.imagen = data.imagen;
    this.dataUser.direccion = data.direccion;
    this.dataUser.telefono = data.telefono;
    this.dataUser.tipo = data.tipo;
    this.dataUser.image = data.image;
  }


  modifyName() {
    $('#closeModalN').click();
    this.modifyNombre.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.modifyNombre).subscribe(
      data => {
        this.Jarwis.updated(this.modifyNombre).subscribe(
          data => {
            this.dataUser.nombre = this.modifyNombre.nombre;
            this.responseSuccess(data);
          },
          error => this.responseError(error)
        )
      },
      error => this.responseError(error)
    );
  }

  modifyId() {
    $('#closeModalI').click();
    this.modifyID.email = this.dataUser.email;
    this.modifyID.tipo = this.dataUser.tipo;
    this.Jarwis.checkPassword(this.modifyID).subscribe(
      data => {
        this.Jarwis.updated(this.modifyID).subscribe(
          data => {
            this.dataUser.id = this.modifyID.id;
            this.responseSuccess(data);
          },
          error => this.responseError(error)
        )
      },
      error => this.responseError(error)
    );
  }

  modifyADDRESS() {
    $('#closeModalA').click();
    this.modifyAddress.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.modifyAddress).subscribe(
      data => {
        this.Jarwis.updated(this.modifyAddress).subscribe(
          data => {
            this.dataUser.direccion = this.modifyAddress.direccion;
            this.responseSuccess(data);
          },
          error => this.responseError(error)
        )
      },
      error => this.responseError(error)
    );
  }

  modifyPHONE() {
    $('#closeModalP').click();
    this.modifyPhone.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.modifyPhone).subscribe(
      data => {
        this.Jarwis.updated(this.modifyPhone).subscribe(
          data => {
            this.dataUser.telefono = this.modifyPhone.telefono;
            this.responseSuccess(data);
          },
          error => this.responseError(error)
        )
      },
      error => this.responseError(error)
    );
  }

  deleteAccount() {
    this.form.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.form).subscribe(
      data => this.delete(),
      error => this.responseError(error)
    );
  }

  delete() {
    this.Jarwis.deleteUser(this.token.get()).subscribe(
      data => this.responseDeleteSuccess(),
      error => this.responseError(error)
    );
  }

  responseDeleteSuccess() {
    this.token.remove();
    $('#closeModal').click();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('');
  }

  responseSuccess(data) {
    this.success = data.data;
    this.status = "success";
  }
  responseError(error) {
    this.error = error.error.error;
    this.status = "error";
  }
  dismissError() {
    this.status = "";
    $('#alertError').attr("data-dismiss", "alert");
  }
  dismissSuccess() {
    this.status = "";
    $('#alertSuccess').attr("data-dismiss", "alert");
  }

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg,.jfif",
    maxSize: "5",
    uploadAPI: {
      url: 'https://avantiparkingbackend.000webhostapp.com/api/upload',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube el avatar de usuario',
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };
  avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    this.image = data.image;
    this.ngOnInit();
  }

  uploadImage(user){
    $('#imgUpt').click();
    this.modifyImage.email = this.dataUser.email;
    this.modifyImage.image = this.image;
    console.log(this.modifyImage);
    this.Jarwis.checkPassword(this.modifyImage).subscribe(
      data => {
        this.Jarwis.updated(this.modifyImage).subscribe(
          data => {
            $('#imgUpt').click();
            //this.dataUser.nombre = this.modifyImage.nombre;
            this.ngOnInit();
            this.responseSuccess(data);
          },
          error => this.responseError(error)
        )
      },
      error => this.responseError(error)
    );
  }
}
