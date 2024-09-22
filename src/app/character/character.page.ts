import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonCardContent,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../services/character/character.service';
import { Observable } from 'rxjs';
import { Character } from '../models/Character';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonImg,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    IonMenuButton,
  ],
})
export class CharacterPage implements OnInit {
  characterService = inject(CharacterService);

  characterList$?: Observable<Character[]>;

  ngOnInit() {
    this.characterList$ = this.characterService.getCharacters();
  }
}
