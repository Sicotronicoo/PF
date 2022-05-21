//ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//APP SECTIONS
import { LoginRoutingModule } from './login.routing.module'; 
import { LoginComponent } from './login.component';

//ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
   
    ReactiveFormsModule,
  ],
  exports: [    
  ]
})
export class LoginModule { }
