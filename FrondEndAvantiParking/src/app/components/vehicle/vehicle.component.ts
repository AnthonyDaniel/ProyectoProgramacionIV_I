import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

import { $ } from 'jquery'
import { Vehicle } from 'src/app/Models/vehicle';
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
  };
  public error = [];
  vehicles: Vehicle[];
  vehicl:Vehicle=new Vehicle();
  
  public editVehicle={
    placa: null,
    modelo: null,
    marca: null,
    users: null,
  }

  constructor(
    private vehicle: VehicleService,
    private auth: AuthService,
    private router: Router,
    private Jarwis: JarwisService,
    private token: TokenService,
  ) { }

  onSubmit() {
    this.vehicle.saveV(this.form).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  handleResponse(data) {
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/vehicle');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
    this.vehicle.getV().subscribe(data => { this.vehicles = data; })
    this.Jarwis.me(this.token.get()).subscribe(
      data => this.data(data),
      error => console.log(error)
    );

  }

  data(data) {
    this.form.users = data.email;
  }

  delete(vehi: Vehicle) {
    this.vehicles = this.vehicles.filter(h => h !== vehi)
    this.vehicle.deleteV(vehi.placa).subscribe(
      data => console.log(data),
      error => console.log(error)
    )

  }

  edit(vehic: Vehicle) {
  this.vehicle.updateV(vehic).subscribe(data=>{
    this.vehicl=data;
  })
  }

 

}