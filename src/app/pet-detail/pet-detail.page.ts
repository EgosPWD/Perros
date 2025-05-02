// src/app/pet-detail/pet-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { 
  IonicModule, 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  NavController
} from '@ionic/angular/standalone';
import { PetService, Pet } from '../services/pet.service';
import { addIcons } from 'ionicons';
import { 
  heart, 
  heartOutline, 
  arrowBack, 
  male,
  female,
  paw,
  flash,
  medkit,
  checkmarkCircle,
  shield,
  globe
} from 'ionicons/icons';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.page.html',
  styleUrls: ['./pet-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonChip
  ]
})
export class PetDetailPage implements OnInit {
  pet?: Pet;
  isLoading: boolean = true;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private navCtrl: NavController
  ) {
    addIcons({ 
      heart, 
      heartOutline, 
      arrowBack, 
      male, 
      female, 
      paw, 
      flash, 
      medkit, 
      checkmarkCircle, 
      shield, 
      globe 
    });
  }

  ngOnInit() {
    this.loadPet();
  }

  ionViewWillEnter() {
    this.checkFavoriteStatus();
  }

  private async loadPet() {
    this.isLoading = true;
    
    this.route.paramMap.subscribe(params => {
      const petId = params.get('id');
      if (petId) {
        this.pet = this.petService.getById(petId);
        this.checkFavoriteStatus();
      }
      this.isLoading = false;
    });
  }

  async checkFavoriteStatus() {
    if (this.pet) {
      this.isFavorite = await this.petService.isFavorite(this.pet.id);
    }
  }

  getIconForAttribute(attribute: string): string {
    const attr = attribute.toLowerCase();
    if (attr.includes('energía')) return 'flash';
    if (attr.includes('pasivo')) return 'paw';
    if (attr.includes('vacunado')) return 'medkit';
    if (attr.includes('entrenado')) return 'checkmarkCircle';
    if (attr.includes('pasaporte')) return 'globe';
    return 'paw';
  }

  async toggleFavorite() {
    if (this.pet) {
      await this.petService.toggleFavorite(this.pet);
      this.isFavorite = await this.petService.isFavorite(this.pet.id);
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  onMatch() {
    // TODO: Implementar lógica de Match
    console.log('Match con:', this.pet?.name);
  }
}