import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { PetService } from '../services/pet.service';
import { PetCardComponent, Pet } from '../components/organisms/pet-card/pet-card.component';
import { addIcons } from 'ionicons';
import { heart, heartOutline, shuffle } from 'ionicons/icons';

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonIcon,
    PetCardComponent
  ]
})
export class RandomPage implements OnInit {
  randomPet?: Pet;
  animateCard: boolean = false;

  constructor(
    private petService: PetService,
    private router: Router
  ) {
    addIcons({ heart, heartOutline, shuffle });
  }

  ngOnInit() {
    this.getNewRandomPet();
  }

  getNewRandomPet() {
    // Primero resetea la animación
    this.animateCard = false;
    
    // Pequeño retraso para permitir que se complete la animación de salida
    setTimeout(() => {
      this.randomPet = this.petService.getRandomPet();
      
      // Un pequeño retraso antes de iniciar la animación de entrada
      setTimeout(() => {
        this.animateCard = true;
      }, 50);
    }, 300);
  }

  onPetSelected(petId: string) {
    this.router.navigate(['/pet-detail', petId]);
  }

  onBookmarkChange(event: { id: string; bookmarked: boolean }) {
    this.petService.toggleFavorite(event.id, event.bookmarked);
  }

  ionViewWillEnter() {
    // Aseguramos que la animación se ejecute al entrar en la página
    this.animateCard = false;
    setTimeout(() => {
      this.animateCard = true;
    }, 50);
  }
}