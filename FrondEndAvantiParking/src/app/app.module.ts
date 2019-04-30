import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideshowModule} from 'ng-simple-slideshow';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Errorpage404Component } from './components/errorpage404/errorpage404.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AdminHomeComponent } from './components/administration/admin-home/admin-home.component';
import { AdminHeadQuartersComponent } from './components/administration/admin-head-quarters/admin-head-quarters.component';
import { AdminParkingsComponent } from './components/administration/admin-parkings/admin-parkings.component';
import { AdminUsersComponent } from './components/administration/admin-users/admin-users.component';
import { AdminAdministratorsComponent } from './components/administration/admin-administrators/admin-administrators.component'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    Errorpage404Component,
    HeroComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ReserveComponent,
    VehicleComponent,
    NotificationsComponent,
    AdminHomeComponent,
    AdminHeadQuartersComponent,
    AdminParkingsComponent,
    AdminUsersComponent,
    AdminAdministratorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    NgbModalModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SlideshowModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DlDateTimeDateModule, 
    DlDateTimePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
