import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;

  password:any;
  passwordC:any;
  errorPassword:any;

  constructor(private frmBuilder: FormBuilder) {
    this.register = this.frmBuilder.group({
      name: ['Antonio', [Validators.required, Validators.minLength(3)] ],
      lastName: ['Marin', [Validators.required, Validators.minLength(3)] ],
      email: ['example@gmail.com', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(3)]],
      phone: ['90909090', [Validators.required] ],
      password: ['********', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['********', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  
  onSubmit(p){
    if(!(this.password == this.passwordC)){
      this.errorPassword = "The passwords are not the same.";
    }else{
      this.errorPassword = "";
    }
    console.log(p);
  }
  
}
