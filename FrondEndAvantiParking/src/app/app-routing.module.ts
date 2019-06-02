import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Errorpage404Component } from './components/errorpage404/errorpage404.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AdminComponent } from './components/admin/admin.component';
const routes: Routes = [
  //All router here 
  { path: '' , component:HomeComponent },
  { path: 'reserve' , component: ReserveComponent, canActivate: [AfterLoginService]},
  { path: 'user/register' , component: RegisterComponent},
  { path: 'user/login' , component: LoginComponent},
  { path: 'user/profile' , component: ProfileComponent},
  { path: 'vehicle' , component: VehicleComponent, canActivate: [AfterLoginService] },
  { path: 'request-password-reset', component: RequestResetComponent},
  { path: 'response-password-reset', component: ResponseResetComponent},
  { path: 'admin',component: AdminComponent},
  { path: '**' , component: Errorpage404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
