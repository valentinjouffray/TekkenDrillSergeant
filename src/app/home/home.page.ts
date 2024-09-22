import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCard,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonFooter,
} from '@ionic/angular/standalone';
import { CharacterService } from '../services/character/character.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCol,
    IonCard,
    IonRow,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenuButton,
    RouterLink,
  ],
})
export class HomePage {
  characterService = inject(CharacterService);
  route = inject(Router);

  /**
   * Pick a random Id from the list of characters and navigate to the character page
   */
  getRandomCharacter() {
    this.characterService
      .getCharacters()
      // Take only the first value from the observable, don't need to keep listening once we leave the page
      .pipe(
        take(1),
        map((characterList) => characterList.map((character) => character.id))
      )
      .subscribe((charactersIdList) => {
        const randomIndex = Math.floor(Math.random() * charactersIdList.length);
        this.route.navigate(['/drills', charactersIdList[randomIndex]]);
      });
  }
}
