// src/app/services/pet.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  sex: 'male' | 'female';
  weight: string;
  imageUrl: string;
  energyLevel: 'high' | 'medium' | 'low';
  description: string;
  attributes: string[];
  isBookmarked?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private petsSubject = new BehaviorSubject<Pet[]>([]);
  public pets$ = this.petsSubject.asObservable();
  private _storage: Storage | null = null;
  private readonly STORAGE_KEY = 'favorite_pets';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Initialize storage
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadMockPets();
    this.loadFavorites();
  }

  getAll(): Observable<Pet[]> {
    return this.pets$;
  }

  getById(id: string): Pet | undefined {
    return this.petsSubject.value.find(pet => pet.id === id);
  }

  // Mock data - would be replaced by API calls in production
  private loadMockPets(): void {
    const mockPets: Pet[] = [
      {
        id: '1',
        name: 'Penny',
        breed: 'Caniche',
        age: 1,
        sex: 'female',
        weight: '2.5 Kg',
        imageUrl: 'assets/pets/penny.jpg',
        energyLevel: 'high',
        description: 'Penny es una perrita muy dulce a la que le encanta ir al parque y jugar con otras mascotas. También le encanta que la bañen. Le encantan las croquetas.',
        attributes: ['Caniche', 'Pasivo', 'Mucha Energía', 'Vacunado', 'Entrenado', 'Con pasaporte']
      },
      {
        id: '2',
        name: 'Glivo',
        breed: 'Bulldog francés',
        age: 2,
        sex: 'male',
        weight: '12 Kg',
        imageUrl: 'assets/pets/glivo.jpg',
        energyLevel: 'medium',
        description: 'Glivo es un bulldog francés muy juguetón y cariñoso. Adora los paseos largos y dormir en el sofá.',
        attributes: ['Energético', 'Sociable', 'Vacunado']
      },
      {
        id: '3',
        name: 'Terry',
        breed: 'Basenji',
        age: 0.2, // 2 meses
        sex: 'male',
        weight: '4 Kg',
        imageUrl: 'assets/pets/terry.jpg',
        energyLevel: 'low',
        description: 'Terry es un cachorro de Basenji tranquilo y curioso. Está aprendiendo a socializar con otros perros.',
        attributes: ['Tranquilo', 'Curioso', 'Cachorro']
      },
      {
        id: '4',
        name: 'Taly',
        breed: 'Maine Coon',
        age: 0.3, // 3 meses
        sex: 'female',
        weight: '2 Kg',
        imageUrl: 'assets/pets/taly.jpg',
        energyLevel: 'medium',
        description: 'Taly es una gatita Maine Coon juguetona y curiosa. Le encanta explorar y jugar con juguetes interactivos.',
        attributes: ['Juguetona', 'Curiosa', 'Independiente']
      }
    ];
    
    this.petsSubject.next(mockPets);
    
    // TODO: En producción, reemplazar con llamada a API:
    // this.http.get<Pet[]>('api/pets').subscribe(pets => {
    //   this.petsSubject.next(pets);
    // });
  }

  async toggleFavorite(pet: Pet) {
    if (!this._storage) return;
    
    const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
    const index = favoriteIds.indexOf(pet.id);
    
    if (index > -1) {
      // Remove from favorites
      favoriteIds.splice(index, 1);
    } else {
      // Add to favorites
      favoriteIds.push(pet.id);
    }
    
    await this._storage.set(this.STORAGE_KEY, favoriteIds);
    await this.loadFavorites();
  }

  async isFavorite(petId: string): Promise<boolean> {
    if (!this._storage) return false;
    
    const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
    return favoriteIds.includes(petId);
  }

  async getFavorites(): Promise<Pet[]> {
    if (!this._storage) return [];
    
    const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
    return this.petsSubject.value.filter(pet => favoriteIds.includes(pet.id));
  }

  private async loadFavorites() {
    if (!this._storage) return;
    
    const favoriteIds = await this._storage.get(this.STORAGE_KEY) || [];
    const updatedPets = this.petsSubject.value.map(pet => ({
      ...pet,
      isBookmarked: favoriteIds.includes(pet.id)
    }));
    
    this.petsSubject.next(updatedPets);
  }
}