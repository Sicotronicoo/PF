import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: '', pathMatch:'full'
  },
  { path: 'main', loadChildren: () => import('./pages/main/main-routing.module').then(m => m.MainRoutingModule)},
  { path: 'register-user', loadChildren: () => import('./pages/auth/sign-up/sign-up.routing.module').then(m => m.LoginRoutingModule) },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.routing.module').then(m => m.LoginRoutingModule)},
  { path: 'dashboard', loadChildren: () => import('./pages/auth/dashboard/sign-up.routing.module').then(m => m.DashboardRoutingModule)},
  { path: 'create-nft', loadChildren: () => import('./pages/formnft/formnft-routing.module').then(m => m.FormnftRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
