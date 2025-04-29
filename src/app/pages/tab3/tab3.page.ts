import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Dog } from '../../interfaces/dog.interface';
import { FavoritesService } from '../../services/favorites.service';
import { DogCardComponent } from '../../components/dog-card/dog-card.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, DogCardComponent],
})
export class Tab3Page implements OnInit {
  favoriteDogs: Dog[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.loadFavorites();
  }
  
  ionViewWillEnter() {
    // Recargar favoritos cuando la página se active
    this.loadFavorites();
  }
  
  loadFavorites() {
    this.favoritesService.getFavorites().subscribe(dogs => {
      this.favoriteDogs = dogs;
    });
  }
}