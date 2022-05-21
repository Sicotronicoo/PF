//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//APP SECTIONS
import { FormnftComponent } from './formnft.component';
import { FormnftRoutingModule } from './formnft-routing.module';
import { AuthService } from 'src/app/shared/services/auth.service';

//ANGULAR MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';


@NgModule({
  declarations: [
    FormnftComponent
  ],
  imports: [
    CommonModule,
    FormnftRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, AuthGuard],

})
export class FormnftModule { }
