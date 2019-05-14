import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MOUSE_MOVE_THROTTLE_MS } from 'angular-resizable-element/resizable.directive';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public form={
    email:null,
    password: null,
  };

  public dataUser = {
    nombre: null,
    email: null,
    id: null,
    imagen: null,
    direccion: null,
    telefono: null,
    tipo: null
  };

  constructor(
    private Jarwis: JarwisService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    //Recordar, cuando nos de error de sesión, que nos manda al login ->Implementar después
    this.Jarwis.me(this.token.get()).subscribe(
      data => this.data(data),
      error => console.log(error)
    );
  }

  data(data){
    this.dataUser.nombre = data.nombre;
    this.dataUser.email = data.email;
    this.dataUser.id = data.id;
    this.dataUser.imagen = data.imagen;
    this.dataUser.direccion = data.direccion;
    this.dataUser.telefono = data.telefono;
    this.dataUser.tipo = data.tipo; 
  }

  deleteAccount() {
    this.form.email = this.dataUser.email;
    this.Jarwis.checkPassword(this.form).subscribe(
      data => this.delete(data),
      error => console.log(error)
    );
    }
    
    delete(data){
      this.Jarwis.deleteUser(this.token.get()).subscribe(
        data => this.responseDeleteSuccess(),
        error => this.responseDeleteError(error)
      );
    }

    responseDeleteSuccess(){
      this.token.remove();
      this.auth.changeAuthStatus(false);
      this.router.navigateByUrl('');
    }

    responseDeleteError(error){
      console.log(error);
    }
}
