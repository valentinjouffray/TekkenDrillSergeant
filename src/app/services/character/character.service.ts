import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Character } from '../../models/Character';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  http = inject(HttpClient);

  /**
   * Returns an observable of all characters in an array. To get a character by ID, use the getCharacterById method.
   * @returns An observable of all characters in an array
   */
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>('/assets/mock-data/characters.json');
  }

  /**
   * Get a character by ID
   * @param characterId The ID of the character to get
   * @returns An observable of the character
   */
  getCharacterById(characterId: number): Observable<Character | undefined> {
    return this.getCharacters().pipe(
      map((characters) =>
        characters.find((character) => character.id === characterId)
      )
    );
  }
}
