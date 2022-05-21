import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewofferComponent } from './newoffer.component';

const routes: Routes = [
  { path: '', component: NewofferComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewofferRoutingModule { }