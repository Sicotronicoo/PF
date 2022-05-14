import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertasnftRoutingModule } from './ofertasnft-routing.module';
import { OfertasnftComponent } from './ofertasnft.component';


@NgModule({
  declarations: [
    OfertasnftComponent,
  ],
  imports: [
    CommonModule,
    OfertasnftRoutingModule
  ]
})
export class OfertasnftModule { }
