// src/app/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonicModule, 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonList,
  IonItem
} from '@ionic/angular/standalone';
import { PetService, Pet } from '../services/pet.service';
import { PetCardComponent } from '../components/organisms/pet-card/pet-card.component';
import { addIcons } from 'ionicons';
import { heart, heartOutline, search } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule, 
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonList,
    IonItem,
    PetCardComponent
  ]
})
export class HomePage implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'todos';

  constructor(
    private petService: PetService,
    private router: Router
  ) {
    addIcons({ heart, heartOutline, search });
  }

  ngOnInit() {
    this.petService.pets$.subscribe(pets => {
      this.pets = pets;
      this.applyFilters();
    });
  }

  applyFilters() {
    let result = this.pets;
    
    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(pet => 
        pet.name.toLowerCase().includes(term) || 
        pet.breed.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (this.selectedCategory !== 'todos') {
      if (this.selectedCategory === 'tranquilo') {
        result = result.filter(pet => pet.energyLevel === 'low');
      } else if (this.selectedCategory === 'cachorro') {
        result = result.filter(pet => pet.age < 1);
      } else if (this.selectedCategory === 'energetico') {
        result = result.filter(pet => pet.energyLevel === 'high');
      }
    }
    
    this.filteredPets = result;
  }

  segmentChanged(event: any) {
    this.selectedCategory = event.detail.value;
    this.applyFilters();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  onPetSelected(petId: string) {
    this.router.navigate(['/tabs/pet', petId]);
  }

  onBookmarkChange(event: { id: string; bookmarked: boolean }) {
    const pet = this.pets.find(p => p.id === event.id);
    if (pet) {
      this.petService.toggleFavorite(pet);
    }
  }
}