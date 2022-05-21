import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewofferRoutingModule } from './newoffer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NewofferRoutingModule,
  ]
})
export class NewofferModule { }
