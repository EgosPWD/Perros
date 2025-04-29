import { Dog } from '../interfaces/dog.interface';

export class DogModel implements Dog {
  id: number;
  name: string;
  breed: string;
  age: number;
  size: 'small' | 'medium' | 'large';
  description: string;
  imageUrl: string;
  personality: string[];
  compatibility: string[];

  constructor(data: Dog) {
    this.id = data.id;
    this.name = data.name;
    this.breed = data.breed;
    this.age = data.age;
    this.size = data.size;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.personality = data.personality;
    this.compatibility = data.compatibility;
  }
}