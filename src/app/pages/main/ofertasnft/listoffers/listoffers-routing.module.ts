import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListoffersComponent } from './listoffers.component';

const routes: Routes = [
  { path: '', component: ListoffersComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListoffersRoutingModule { }
