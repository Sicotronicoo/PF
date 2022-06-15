import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  {
    path: '', redirectTo: 'main', pathMatch:'full'
  },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)},
  { path: 'register', loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)},
  { path: 'dashboard', loadChildren: () => import('./pages/auth/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
  { path: 'createnft', loadChildren: () => import('./pages/formnft/formnft.module').then(m => m.FormnftModule),  canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
