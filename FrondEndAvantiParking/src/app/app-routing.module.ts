import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Errorpage404Component } from './components/errorpage404/errorpage404.component';

const routes: Routes = [
  //All router here 

  { path: '**' , component: Errorpage404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
