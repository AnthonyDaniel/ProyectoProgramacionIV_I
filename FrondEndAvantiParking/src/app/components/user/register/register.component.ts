import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  constructor(private frmBuilder: FormBuilder) {
    this.register = this.frmBuilder.group({
      name: ['Antonio', [Validators.required, Validators.minLength(3)] ],
      lastName: ['Marin', [Validators.required, Validators.minLength(3)] ],
      email: ['example@gmail.com', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(3)]],
      phone: ['90909090', [Validators.required] ],
      password: ['********', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  
  onSubmit(p){
    console.log(p);
  }
  
}
