import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormnftComponent } from './formnft.component';


const routes: Routes = [{ path: '', component: FormnftComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormnftRoutingModule { }
