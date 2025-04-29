export interface Dog {
  id: number;
  name: string;
  breed: string;
  age: number;
  size: 'small' | 'medium' | 'large';
  description: string;
  imageUrl: string;
  personality: string[];
  compatibility: string[];
}