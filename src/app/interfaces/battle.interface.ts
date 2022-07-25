import { Hero } from './hero.interface';

export interface Battle {
  date: Date;
  hero: Hero;
  enemy: Hero;
  status: string;
}
