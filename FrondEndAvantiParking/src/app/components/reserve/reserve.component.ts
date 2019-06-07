import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';

import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { timeout } from 'q';

import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms'
import { AdminService } from 'src/app/services/admin.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { TokenService } from 'src/app/services/token.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  timeStart = {hour: 13, minute: 0 };
  timeEnd = {hour: 23, minute: 59 };

  public reserves = {
    fechaReserva:null,
    horaInicio:{hour: 13, minute: 0 },
    horaFinal:{hour: 23, minute: 59 },
  }

  public confirm  ={
    park:null,
    vehicle:null
  }

  public park;
  public user;
  public vehicles;
  public statusSpace:boolean = false;
  public res;

  public space = {
    idEspacio:null
  };
  public spaces;
  public parking;

  
  constructor(private calendar: NgbCalendar,private admin: AdminService,
    private vehicle: VehicleService,private Jarwis: JarwisService,private token: TokenService) {

  }

  ngOnInit() {
    this.admin.getParqueo().subscribe(
      data => {
        this.parking = data;
      },
      error => console.log(error)
    );
    this.Jarwis.me(this.token.get()).subscribe(
      data => {
        this.infoUser(data);
        this.listar();
      },
    );
  }
  infoUser(data){
    var f = {
      users:null
    }
    this.user = data.email;
    f.users = data.email;
    this.vehicle.getV(f).subscribe(
      data => {
        this.infoVehicle(data);
      },
      error => console.log(error)
    );
    this.listar();
  }
  infoVehicle(data){
    this.vehicles = data;
  }
  reserve(){
   
    alert( this.reserves.fechaReserva.day);
    console.log(this.reserves.fechaReserva);  

  }

  confirmR(){
    this.statusSpace=true;
    this.seeSpaces();
    $('#OpenModal').click();
  }

  seeSpaces() {
    var i = {
      idParqueo:this.confirm.park
    }
    this.admin.getSpace(i).subscribe(
      data => {
        this.spaces = data;
        console.log(this.spaces);
      },
      error => console.log(error)
    );
  }

  selectSpace(space){
    this.space = space ;
    $('#closeM').click();
  }

  reservar(){
    var i ={
      fechaReserva:this.reserves.fechaReserva.year+"-"+this.reserves.fechaReserva.month+"-"+this.reserves.fechaReserva.day,
      horaInicio:this.reserves.horaInicio.hour+":"+this.reserves.horaInicio.minute,
      horaFinal:this.reserves.horaFinal.hour+":"+this.reserves.horaFinal.minute,
      espacio:this.space.idEspacio,
      users:this.user,
      vehiculo:this.confirm.vehicle,
    }
    this.admin.addReserve(i).subscribe(
      data=>{
        this.listar();
      },
      error=>{
        console.log(error);
      }
    );
    console.log(i);
  }
  listar(){
    var f = {
      users:this.user
    }
    this.admin.listReserve(f).subscribe(
      data=>{
        this.res = data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  deleteReserve(s){
    this.admin.deleteReserve(s).subscribe(
      data=>{
        this.listar();
      },
      error=>{
        console.log(error);
      }
    );
  }
}

