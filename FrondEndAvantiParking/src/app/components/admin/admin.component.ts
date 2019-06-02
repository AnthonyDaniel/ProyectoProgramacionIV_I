import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public registerUser = {
    email: null,
    nombre: null,
    id: null,
    direccion: null,
    telefono: null,
    password: null,
  };
  public error = [];
  public users;

  constructor(private admin: AdminService) { }

  ngOnInit() {
    this.admin.getUser().subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => console.log(error)
    );
  }

  registerUsers() {
    this.admin.registerUser(this.registerUser).subscribe(
      data => {
        this.clean();
        $('#closeModalRegister').click();
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
  }

  handleError(error) {
    this.error = error.error.errors;
  }

}
