import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full'},
  { path: ':nameNft', loadChildren: () => import('./ofertasnft/ofertasnft.module').then(m => m.OfertasnftModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
