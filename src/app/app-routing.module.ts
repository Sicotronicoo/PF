import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';


const routes: Routes = [
  {
    path: '', redirectTo: '', pathMatch:'full'
  },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)},
  { path: 'register', loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)},
  { path: 'dashboard', loadChildren: () => import('./pages/auth/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'create-nft', loadChildren: () => import('./pages/formnft/formnft.module').then(m => m.FormnftModule)},
 // { path: 'ofertanft', loadChildren: () => import('./pages/main/ofertasnft/ofertasnft.module').then(m => m.OfertasnftModule)},

/*   { path: 'nfts/:id', component: MainComponent },
 */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
