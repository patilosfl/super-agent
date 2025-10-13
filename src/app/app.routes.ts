import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dabang/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'document',
    loadComponent: () => import('./document/document.component').then(m => m.DocumentComponent),
  },
];
