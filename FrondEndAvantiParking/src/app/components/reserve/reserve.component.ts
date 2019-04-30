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

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  timeStart = {hour: 13, minute: 0 };
  timeEnd = {hour: 23, minute: 59 };

  private colorSelectParking:any;
  private colorSelectVehicle:any ;
  private colorSelectSpace:any;
  private lots:any = ["G1","G2","G3","G4","G5","G6","G7","G8","G9"];
  private vehicles:any = ["Toyota CL6342","Nissan CL4341","Honda MOT31231"];
  private parking:any = ["Down 7J","AvantiUp J6","Down K9"];
  
  optionSelectParking: string = '0';
  optionSelectVehicle: string = '0';
  viewSelectV: string    = '';
  viewSelectP: string    = '';

  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbCalendar) {
    this.colorSelectSpace = "border-secondary btn-secondary";

  }

  ngOnInit() {

  }
  selectToday() {
    this.model = this.calendar.getToday();
  }
  selectVehicle():void{
    if(this.viewSelectV=="Select your vehicle"){
      this.colorSelectVehicle = "";
    }else{
      this.colorSelectVehicle = "border border-success rounded";
    }
  }
  selectParking():void{
    this.colorSelectParking = "border border-success rounded";
  }
  captureVehicle():void{
    this.viewSelectV = this.optionSelectVehicle;
  }
  captureParking():void{
    this.viewSelectP = this.optionSelectParking;
  }
  selectSpace():void{
    this.colorSelectSpace = "border-success btn-success";
  }
}

