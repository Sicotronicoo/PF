import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormnftComponent } from './formnft.component';
import { AuthGuard } from "src/app/shared/guard/auth.guard";


const routes: Routes = [{ path: '', component: FormnftComponent,  canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormnftRoutingModule { }
