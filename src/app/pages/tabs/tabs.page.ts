// src/app/pages/tabs/tabs.page.ts
import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart, paw, shuffle } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="home">
          <ion-icon name="home"></ion-icon>
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="random">
          <ion-icon name="shuffle"></ion-icon>
          <ion-label>Aleatorio</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="favorites">
          <ion-icon name="heart"></ion-icon>
          <ion-label>Favoritos</ion-label>
        </ion-tab-button>
        
      </ion-tab-bar>
    </ion-tabs>
  `,
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsPage {
  constructor() {
    addIcons({ home, heart, paw, shuffle });
  }
}