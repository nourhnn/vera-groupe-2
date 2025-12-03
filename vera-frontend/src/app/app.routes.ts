// import { Routes } from '@angular/router';
// import { ChatComponent } from './pages/chat/chat';
// import { DashboardComponent } from './pages/dashboard/dashboard';

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'chat',
//     pathMatch: 'full',
//   },
//   {
//     path: 'chat',
//     component: ChatComponent,
//   },
//   {
//     path: 'dashboard',
//     loadComponent: () =>
//       import('./pages/dashboard/dashboard').then(c => c.DashboardComponent),
//     canActivate: [
//       () => {
//         const token = localStorage.getItem('vera_admin_token');
//         return !!token || window.location.assign('/admin-login');
//       }
//     ]
//   },
//   {
//     path: 'admin-login',
//     loadComponent: () =>
//       import('./pages/admin-login/admin-login').then(c => c.AdminLoginComponent)
//   },
    
// ];


import { Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { LandingComponent } from './pages/landing/landing'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'landing',
    component: LandingComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
];
