import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { OfertasnftComponent } from './ofertasnft.component';

const routes: Routes = [{ path: '', component: OfertasnftComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertasnftRoutingModule { }
