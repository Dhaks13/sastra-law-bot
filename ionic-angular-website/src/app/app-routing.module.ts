import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    data: {
      preload: true
    },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    data: {
      preload: true
    },
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    data: {
      preload: true
    },
  },
  // {
  //   path: 'dss',
  //   loadChildren: () => import('./dss/dss.module').then( m => m.DSSPageModule),
  //   data: {
  //     preload: true
  //   },
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    data: {
      preload: true
    },
  },
  {
    path: 'rs',
    loadChildren: () => import('./rs/rs.module').then( m => m.RSPageModule),
    data: {
      preload: true
    },
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
