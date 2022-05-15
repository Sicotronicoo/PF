//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//APP SECTIONS
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NftService } from 'src/app/shared/services/nft.service';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
