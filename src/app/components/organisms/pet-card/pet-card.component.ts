import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PetImageComponent } from '../../molecules/pet-image/pet-image.component';
import { PetInfoComponent } from '../../molecules/pet-info/pet-info.component';

export interface Pet {
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
  selector: 'app-pet-card',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    PetImageComponent,
    PetInfoComponent 
  ],
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss']
})
export class PetCardComponent {
  @Input() pet!: Pet;
  @Output() bookmark = new EventEmitter<{ id: string; bookmarked: boolean }>();
}