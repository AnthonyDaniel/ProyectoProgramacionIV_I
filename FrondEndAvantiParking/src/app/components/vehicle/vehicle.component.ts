import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { $ } from 'jquery'
import { Vehicle } from 'src/app/Models/vehicle';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { formatPercent } from '@angular/common';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  public form = {
    placa: null,
    modelo: null,
    marca: null,
    users: null,
    image: null,
  };

  public vehicles;
  public urlImg;

  public editVehicle = {
    placa: null,
    modelo: null,
    marca: null,
    users: null,

  }
  public error: String;
  public success: String;
  public status: String;

  constructor(
    private vehicle: VehicleService,
    private auth: AuthService,
    private router: Router,
    private Jarwis: JarwisService,
    private token: TokenService,


  ) { 
    this.urlImg = 'http://localhost:8000/api/avatarvehicle/';  
  }

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg,.jfif",
    maxSize: "5",
    uploadAPI: {
      url: 'http://localhost:8000/api/uploadvehicle', 
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'photo',
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
  handleResponse(data) {
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/vehicle');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
    this.Jarwis.me(this.token.get()).subscribe(
      data => {
        this.data(data);
      },
    );
  }

  data(data) {
    this.form.users = data.email;
    console.log(this.form);
    this.get();
  }

  onSubmit() {
    this.vehicle.saveV(this.form).subscribe(
      data => {
        this.responseSuccess(data);
        this.get();
        this.form.marca = null;
        this.form.modelo = null;
        this.form.placa = null;
      },
      error => this.responseError(error),
    );

  }

  delete(vehi: Vehicle) {
    vehi.users = this.form.users;
    this.vehicle.deleteV(vehi).subscribe(
      data => {
        this.vehicles = this.vehicles.filter(h => h !== vehi);
        this.responseSuccess(data),
          error => this.responseError(error)
      },
    );
  }
  get() {
    this.vehicle.getV(this.form).subscribe(
      data => {
        this.vehicles = data;
      },
      error => this.responseError(error)
    );
  }
  edit(vehic: Vehicle) {
    this.vehicle.updateV(vehic).subscribe(data => {
      this.responseSuccess(data),
        error => this.responseError(error)
    });
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
  avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    this.form.image = data.image;
  }
}