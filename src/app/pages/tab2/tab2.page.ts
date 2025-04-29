import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dog } from '../../interfaces/dog.interface';
import { DogService } from '../../services/dog.service';
import { DogCardComponent } from '../../components/dog-card/dog-card.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, DogCardComponent, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonicModule],
})
export class Tab2Page implements OnInit {
  dogs: Dog[] = [];
  filteredDogs: Dog[] = [];
  searchTerm: string = '';

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.dogService.getDogs().subscribe(dogs => {
      this.dogs = dogs;
      this.filteredDogs = [...this.dogs];
    });
  }

  searchDogs() {
    if (!this.searchTerm.trim()) {
      this.filteredDogs = [...this.dogs];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredDogs = this.dogs.filter(dog => 
      dog.name.toLowerCase().includes(term) || 
      dog.breed.toLowerCase().includes(term) ||
      dog.personality.some(trait => trait.toLowerCase().includes(term)) ||
      dog.compatibility.some(item => item.toLowerCase().includes(term))
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredDogs = [...this.dogs];
  }
}