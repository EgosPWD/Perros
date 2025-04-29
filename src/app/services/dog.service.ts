import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dog } from '../interfaces/dog.interface';
import { DogModel } from '../models/dog.model';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private dogsSubject = new BehaviorSubject<Dog[]>([]);
  public dogs$ = this.dogsSubject.asObservable();

  constructor() {
    // Cargar datos simulados iniciales
    this.loadDogs();
  }

  getDogs(): Observable<Dog[]> {
    return this.dogs$;
  }

  getDogById(id: number): Dog | undefined {
    return this.dogsSubject.value.find(dog => dog.id === id);
  }

  // En una aplicación real, esto vendría de una API
  private loadDogs(): void {
    const mockDogs: Dog[] = [
      new DogModel({
        id: 1,
        name: 'Max',
        breed: 'Labrador Retriever',
        age: 3,
        size: 'large',
        description: 'Max es un labrador amigable y juguetón. Le encanta correr y jugar a buscar la pelota.',
        imageUrl: 'assets/dogs/dog1.jpg',
        personality: ['Juguetón', 'Amigable', 'Activo'],
        compatibility: ['Familias', 'Niños', 'Otros perros']
      }),
      new DogModel({
        id: 2,
        name: 'Luna',
        breed: 'Border Collie',
        age: 2,
        size: 'medium',
        description: 'Luna es muy inteligente y tiene mucha energía. Necesita actividad física y mental diaria.',
        imageUrl: 'assets/dogs/dog2.jpg',
        personality: ['Inteligente', 'Enérgica', 'Leal'],
        compatibility: ['Dueños activos', 'Entrenamiento']
      }),
      new DogModel({
        id: 3,
        name: 'Rocky',
        breed: 'Bulldog Francés',
        age: 4,
        size: 'small',
        description: 'Rocky es cariñoso y tranquilo. Disfruta de siestas largas y paseos cortos.',
        imageUrl: 'assets/dogs/dog3.jpg',
        personality: ['Tranquilo', 'Cariñoso', 'Sociable'],
        compatibility: ['Apartamentos', 'Personas mayores']
      }),
      new DogModel({
        id: 4,
        name: 'Bella',
        breed: 'Golden Retriever',
        age: 1,
        size: 'large',
        description: 'Bella es una cachorra dulce y juguetona. Se lleva bien con todos y aprende rápido.',
        imageUrl: 'assets/dogs/dog4.jpg',
        personality: ['Dulce', 'Adaptable', 'Cariñosa'],
        compatibility: ['Familias', 'Niños', 'Otros animales']
      }),
      new DogModel({
        id: 5,
        name: 'Toby',
        breed: 'Beagle',
        age: 5,
        size: 'medium',
        description: 'Toby tiene un gran sentido del olfato y le encanta explorar. Es independiente pero cariñoso.',
        imageUrl: 'assets/dogs/dog5.jpg',
        personality: ['Curioso', 'Aventurero', 'Independiente'],
        compatibility: ['Casas con jardín', 'Excursionistas']
      })
    ];
    
    this.dogsSubject.next(mockDogs);
  }
}