import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertasnftRoutingModule } from './ofertasnft-routing.module';
import { OfertasnftComponent } from './ofertasnft.component';
import { NewofferComponent } from './newoffer/newoffer.component';
import { ListoffersComponent } from './listoffers/listoffers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/shared/services/auth.service';



@NgModule({
  declarations: [
    OfertasnftComponent,
    NewofferComponent,
    ListoffersComponent,
  ],
  imports: [
    CommonModule,
    OfertasnftRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],


})
export class OfertasnftModule { }
