import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Errorpage404Component } from './components/errorpage404/errorpage404.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/administration/admin-home/admin-home.component';
import { AdminParkingsComponent } from './components/administration/admin-parkings/admin-parkings.component';
import { AdminHeadQuartersComponent } from './components/administration/admin-head-quarters/admin-head-quarters.component';
import { AdminAdministratorsComponent } from './components/administration/admin-administrators/admin-administrators.component';
import { AdminUsersComponent } from './components/administration/admin-users/admin-users.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AuthorizationAdminService } from './services/authorization-admin.service';
const routes: Routes = [
  //All router here 
  { path: '' , component:HomeComponent },
  { path: 'reserve' , component: ReserveComponent, canActivate: [AfterLoginService] },
  { path: 'user/register' , component: RegisterComponent, canActivate: [BeforeLoginService]},
  { path: 'user/login' , component: LoginComponent, canActivate: [BeforeLoginService] },
  { path: 'user/profile' , component: ProfileComponent,canActivate: [AfterLoginService] },
  { path: 'vehicle' , component: VehicleComponent, canActivate: [AfterLoginService] },
  { path: 'administration/admin-home' , component: AdminHomeComponent, canActivate: [AuthorizationAdminService]},
  { path: 'administration/admin-parkings', component: AdminParkingsComponent , canActivate: [AuthorizationAdminService]}, 
  { path: 'administration/admin-administrators', component: AdminAdministratorsComponent , canActivate: [AuthorizationAdminService]},
  { path: 'administration/admin-head-quarters', component: AdminHeadQuartersComponent, canActivate: [AuthorizationAdminService]},
  { path: 'administration/admin-users', component:AdminUsersComponent , canActivate: [AuthorizationAdminService]},
  { path: 'notifications', component: NotificationsComponent , canActivate: [AfterLoginService]},
  { path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService]},
  { path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService]},
  { path: '**' , component: Errorpage404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
