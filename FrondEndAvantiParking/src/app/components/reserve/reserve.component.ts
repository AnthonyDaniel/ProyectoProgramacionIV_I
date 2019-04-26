import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  private colorSelectParking:any;
  private colorSelectVehicle:any ;

  private vehicles:any = ["Toyota CL6342","Nissan CL4341","Honda MOT31231"];
  private parking:any = ["Down 7J","AvantiUp J6","Down K9"];
  
  optionSelectParking: string = '0';
  optionSelectVehicle: string = '0';
  viewSelectV: string    = '';
  viewSelectP: string    = '';

  constructor() {}

  ngOnInit() {

  }

  selectVehicle():void{
    if(this.viewSelectV=="Select your vehicle"){
      this.colorSelectVehicle = "";
    }else{
      this.colorSelectVehicle = "border border-success rounded";
    }
  }

  selectParking():void{
    if(this.viewSelectP=="Select your parking"){
      this.colorSelectParking = "";
    }else{
      this.colorSelectParking = "border border-success rounded";
    }
  }
  captureVehicle() {
    this.viewSelectV = this.optionSelectVehicle;
  }
  captureParking(){
    this.viewSelectP = this.optionSelectParking;
  }
}

