import { Routes } from '@angular/router';
import { FavoriteComponent } from './components/atoms/button/favorite';

export const routes: Routes = [
  {
    path: 'favorite',
    component: FavoriteComponent,
  },  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorites/favorites.page').then( m => m.FavoritesPage)
  },
  {
    path: 'pet-detail',
    loadComponent: () => import('./pet-detail/pet-detail.page').then( m => m.PetDetailPage)
  },

];