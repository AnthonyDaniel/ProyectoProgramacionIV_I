import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private admin: AdminService) { }

  filterUsers = '';
  filterSedes = '';
  filterParking = '';

  public registerUser = {
    email: null,
    nombre: null,
    id: null,
    direccion: null,
    telefono: null,
    password: null,
  };

  public registerSede = {
    nombre: null,
    idSede: null,
    direccion: null,
    canton: null,
    provincia: null
  }

  public registerParking = {
    nombre:null,
    idParqueo:null,
    zona:null,
    sede:null,
    cantidad:null
  }
  public sede;
  public error = [];
  public users;
  public sedes;
  public parking;
  public errorr: String;
  public success: String;
  public status: String;
  public statusP:String;
  public errorP: String;
  ngOnInit() {
    this.admin.getUser().subscribe(
      data => {
        this.users = data;
      },
      error => console.log(error)
    );
    this.admin.getSede().subscribe(
      data => {
        this.sedes = data;
      },
      error => console.log(error)
    );
    this.admin.getParqueo().subscribe(
      data => {
        this.parking = data;
      },
      error => console.log(error)
    );
  }

  registerUsers() {
    this.admin.registerUser(this.registerUser).subscribe(
      data => {
        this.clean();
        $('#closeModalRegister').click();
        this.admin.getUser().subscribe(
          data => {
            this.users = data;
          },
          error => console.log(error)
        );
      },
      error => this.handleError(error)
    );
  }

  clean() {
    this.registerUser.email = null;
    this.registerUser.nombre = null;
    this.registerUser.id = null;
    this.registerUser.direccion = null;
    this.registerUser.telefono = null;
    this.registerUser.password = null;
    this.registerSede.nombre = null,
    this.registerSede.idSede = null;
    this.registerSede.direccion = null;
    this.registerSede.canton = null;
    this.registerSede.provincia = null;
    this.registerParking.idParqueo = null;
    this.registerParking.nombre = null;
    this.registerParking.cantidad = null;
    this.registerParking.sede = null;
    this.registerParking.zona = null;
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  deleteUsers(user) {
    this.admin.deleteUser(user).subscribe(
      data => {
        this.ngOnInit();
      },
      error => console.log(error)
    );
  }
  adminUsers(user) {
    if (user.tipo == 1) {
      user.tipo = 0;
      this.admin.adminUser(user).subscribe(
        data => {
          this.ngOnInit();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      user.tipo = 1;
      this.admin.adminUser(user).subscribe(
        data => {
          this.ngOnInit();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  //----------------------------------Sedes
  registerH() {
    this.admin.registerSede(this.registerSede).subscribe(
      data => {
        $('#closeModalRegisterH').click();
        this.clean();
        this.responseSuccessSede(data);
        this.ngOnInit();
      },
      error => {
        this.handleError(error); 
      }
    );
  }
  modifySede(sede) {
    this.admin.modifySede(sede).subscribe(
      data => {
        this.responseSuccessSede(data);
        this.ngOnInit();
      },
      error => {
        this.responseErrorSede(error);
      }
    );
  }
  deleteSede(sede) {
    this.admin.deleteSede(sede).subscribe(
      data => {
        this.ngOnInit();
        this.responseSuccessSede(data);
      },
      error => {
        console.log(error);
        this.responseErrorSede(error);
      }
    );
  }
  responseSuccessSede(data) {
    this.success = data.data;
    this.status = "success";
  }
  responseErrorSede(error) {
    console.log(error);
    if(error.error.errors){
      this.errorr = "Do not leave blank spaces";
    }
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

  //Parking lot
  registerP(){
    this.admin.registerParking(this.registerParking).subscribe(
      data => {
        $('#closeModalRegisterP').click();
        this.clean();
        this.responseSuccessParqueo(data);
        this.ngOnInit();
      },
      error => {
        this.handleError(error); 
      }
    );
  }
  responseSuccessParqueo(data) {
    this.success = data.data;
    this.statusP = "success";
  }
  responseErrorParqueo(error) {
    console.log(error);
    if(error.error.errors || error.error.error){
      this.errorP = "Do not leave blank spaces or check numerical values";
    }
    this.statusP = "error";
  }
  dismissErrorP() {
    this.statusP = "";
    $('#alertErrorP').attr("data-dismiss", "alert");
  }
  dismissSuccessP() {
    this.statusP = "";
    $('#alertSuccessP').attr("data-dismiss", "alert");
  }
  modifyP(park){
    this.admin.modifyParking(park).subscribe(
      data => {
        this.responseSuccessParqueo(data);
        this.ngOnInit();
      },
      error => {
        this.responseErrorParqueo(error);
      }
    );
  }
  deleteP(park){
    this.admin.deleteParking(park).subscribe(
      data => {
        this.ngOnInit();
        this.responseSuccessParqueo(data);
      },
      error => {
        console.log(error);
        this.responseErrorParqueo(error);
      }
    );
  }
}
