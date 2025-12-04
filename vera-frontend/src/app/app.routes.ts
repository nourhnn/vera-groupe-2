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
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'politique-confidentialite',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((c) => c.PrivacyPolicyComponent),
  },
  {
    path: 'cgu',
    loadComponent: () => import('./pages/cgu/cgu').then((c) => c.CguComponent),
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then((c) => c.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
