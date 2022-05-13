//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//APP SECTIONS
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
