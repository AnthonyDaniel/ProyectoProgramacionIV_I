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
const routes: Routes = [
  //All router here 
  { path: '' , component:HomeComponent },
  { path: 'reserve' , component: ReserveComponent },
  { path: 'user/register' , component: RegisterComponent},
  { path: 'user/login' , component: LoginComponent },
  { path: 'hero' , component: HeroComponent },
  { path: 'administration/admin-home' , component: AdminHomeComponent},
  { path: 'administration/admin-parkings', component: AdminParkingsComponent},
  { path: 'administration/admin-administrators', component: AdminAdministratorsComponent},
  { path: 'administration/admin-head-quarters', component: AdminHeadQuartersComponent},
  { path: 'administration/admin-users', component:AdminUsersComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: '**' , component: Errorpage404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
