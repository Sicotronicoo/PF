//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//APP SECTIONS
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
