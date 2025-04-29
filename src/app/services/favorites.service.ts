import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Dog } from '../interfaces/dog.interface';
import { DogService } from './dog.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Dog[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();
  private _storage: Storage | null = null;
  private readonly STORAGE_KEY = 'favorite_dogs';

  constructor(
    private storage: Storage, 
    private dogService: DogService
  ) {
    this.init();
  }

  async init() {
    // Inicializar storage
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  getFavorites(): Observable<Dog[]> {
    return this.favorites$;
  }

  async loadFavorites() {
    if (this._storage) {
      const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
      const allDogs = await this.dogService.dogs$.toPromise();
      
      if (allDogs) {
        const favoriteDogs = allDogs.filter(dog => favoriteIds.includes(dog.id));
        this.favoritesSubject.next(favoriteDogs);
      }
    }
  }

  async toggleFavorite(dog: Dog) {
    if (!this._storage) return;
    
    const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
    const index = favoriteIds.indexOf(dog.id);
    
    if (index > -1) {
      // Eliminar de favoritos
      favoriteIds.splice(index, 1);
    } else {
      // Añadir a favoritos
      favoriteIds.push(dog.id);
    }
    
    await this._storage.set(this.STORAGE_KEY, favoriteIds);
    await this.loadFavorites();
  }

  async isFavorite(dogId: number): Promise<boolean> {
    if (!this._storage) return false;
    
    const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
    return favoriteIds.includes(dogId);
  }
}