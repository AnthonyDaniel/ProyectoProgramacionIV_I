import { Component, OnInit } from '@angular/core';
import{VehicleService } from 'src/app/services/vehicle.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { $ } from 'jquery'
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  public form = {
    license: null,
    mark: null,
    model:null,
  };
  public error = [];

 
  constructor(private vehicle: VehicleService,
    private auth: AuthService,
    private router: Router,) { }
    modifyName(){
      alert("qweqw");
    }
  
  onSubmit(){
    this.vehicle.saveV(this.form).subscribe(
      data => console.log('jhgfd'),
      error => console.log('nbvgcfdsfgh')
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
    
  }


}
