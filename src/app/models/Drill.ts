export interface Drill {
  id: number;
  name: string;
  description: string;
  // Use characterId to link to a character
  characterId: number;
  tags: string[];
}
