import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(private frmBuilder:FormBuilder) {
    this.login = this.frmBuilder.group({
    
      email: ['example@gmail.com', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"),Validators.minLength(3)]],
      password: ['********',[ Validators.required,Validators.minLength(8)]]
    });
   }

  ngOnInit() {
  }

  onSubmit(p){
    console.log(p);
  }
  
}
