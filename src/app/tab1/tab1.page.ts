import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PetCardComponent } from '../components/organisms/pet-card/pet-card.component';
import { addIcons } from 'ionicons';  // Importa addIcons
import { heart, heartOutline } from 'ionicons/icons';  // Importa los iconos específicos

interface Pet {
  id: string;
  name: string;
  gender: 'male' | 'female';
  breed: string;
  age: number;
  trait: string;
  imageUrl: string;
  isBookmarked: boolean;
}

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [CommonModule, IonicModule, PetCardComponent],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page {
  pets: Pet[] = [
    {
      id: '1',
      name: 'Max',
      gender: 'male',
      breed: 'Golden Retriever',
      age: 3,
      trait: 'Energético',
      imageUrl: 'assets/images/pets/dog1.jpg',
      isBookmarked: false
    },
    {
      id: '2',
      name: 'Luna',
      gender: 'female',
      breed: 'Pug',
      age: 2,
      trait: 'Amigable',
      imageUrl: 'assets/images/pets/dog2.jpg',
      isBookmarked: true
    }
  ];

  constructor() {
    addIcons({ heart, heartOutline });
  }

  onBookmark(event: { id: string; bookmarked: boolean }) {
    const pet = this.pets.find(p => p.id === event.id);
    if (pet) {
      pet.isBookmarked = event.bookmarked;
      console.log(`Bookmark updated for ${pet.name}: ${pet.isBookmarked}`);
    }
  }
}