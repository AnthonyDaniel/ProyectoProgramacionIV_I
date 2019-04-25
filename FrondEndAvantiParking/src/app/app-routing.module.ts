import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Errorpage404Component } from './components/errorpage404/errorpage404.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/administration/admin-home/admin-home.component';
 
const routes: Routes = [
  //All router here 
  { path: '' , component:HomeComponent },
  { path: 'reserve' , component: ReserveComponent },
  { path: 'user/register' , component: RegisterComponent},
  { path: 'user/login' , component: LoginComponent },
  { path: 'hero' , component: HeroComponent },
  { path: 'administration/admin-home' , component: AdminHomeComponent},
  { path: '**' , component: Errorpage404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
