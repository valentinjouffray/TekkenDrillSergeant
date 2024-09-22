import { Game } from './Games';

export interface Character {
  id: number;
  name: string;
  games: Game[];
  description: string;
}
