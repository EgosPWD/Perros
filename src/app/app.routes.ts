// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
        data: {title: 'Inicio'}
      },
      {
        path: 'random',
        loadComponent: () => import('./random/random.page').then(m => m.RandomPage),
        data: {title: 'Aleatorio'}
      },
      {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites.page').then(m => m.FavoritesPage),
        data: {title: 'Favorites'}
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'pet-detail/:id',
    loadComponent: () => import('./pet-detail/pet-detail.page').then(m => m.PetDetailPage),
    data: { title: 'Detalle' }
  },
  {
    path: '**', // Ruta comodín para manejar 404
    redirectTo: 'tabs/home'
  }
];