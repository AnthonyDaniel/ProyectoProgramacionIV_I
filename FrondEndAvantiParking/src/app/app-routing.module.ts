import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Errorpage404Component } from './components/errorpage404/errorpage404.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ReserveComponent } from './components/reserve/reserve.component';

const routes: Routes = [
  //All router here 
  { path: 'reserve' , component: ReserveComponent },
  { path: 'user/register' , component: RegisterComponent},
  { path: 'user/login' , component: LoginComponent },
  { path: '**' , component: Errorpage404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
