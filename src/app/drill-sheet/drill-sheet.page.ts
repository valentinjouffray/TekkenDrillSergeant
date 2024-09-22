import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonMenuButton,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { Character } from '../models/Character';
import { Drill } from '../models/Drill';
import { CharacterService } from '../services/character/character.service';
import { DrillService } from '../services/drill/drill.service';

@Component({
  selector: 'app-drill-sheet',
  templateUrl: './drill-sheet.page.html',
  styleUrls: ['./drill-sheet.page.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    IonGrid,
    IonButton,
    IonLabel,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonMenuButton,
  ],
})
export class DrillSheetPage implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  drillService = inject(DrillService);
  characterService = inject(CharacterService);
  formBuilder = inject(FormBuilder);

  drillForm?: FormGroup;

  editModeOn: boolean = false;
  characterList$?: Observable<Character[]>;
  selectedCharacter?: BehaviorSubject<Character | undefined> =
    new BehaviorSubject<Character | undefined>(undefined);
  newDrillId: number = 1;

  ngOnInit() {
    this.drillForm = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      characterId: [{ value: 999, disabled: false }, Validators.required],
      tags: [[] as string[]],
    });
    console.debug('Drill form:', this.drillForm);
    this.characterList$ = this.characterService.getCharacters();
    const drillId = Number.parseInt(
      this.activatedRoute.snapshot.params['drillId']
    );
    if (!drillId || isNaN(drillId)) {
      // Only for a new drill
      console.debug('No drill ID provided, fields will be empty');
      this.drillService
        .getNewDrillId()
        .pipe(take(1))
        .subscribe((id) => {
          this.newDrillId = id;
          this.drillForm?.patchValue({ id: id });
          console.debug('New drill ID:', id);
        });
      return;
    }
    // For editing an existing drill
    this.editModeOn = true;
    this.drillService
      .getDrills()
      .pipe(
        take(1),
        map((drills) => drills.find((drill) => drill.id === drillId))
      )
      .subscribe((drill) => {
        console.debug('Drill:', drill);
        if (!drill) {
          console.error('Drill not found');
          return;
        }
        this.drillForm?.patchValue({
          name: drill.name,
          description: drill.description,
          tags: drill.tags,
          id: drill.id,
        });
        // Set the character ID field to disabled since it cannot be changed in edit mode
        this.drillForm?.get('characterId')?.disable();
        console.debug('Drill ID:', drillId);
        console.debug('Drill form:', this.drillForm?.value);
      });
  }

  onSubmit() {
    if (!this.drillForm || !this.drillForm.valid) {
      console.error('Form is invalid');
      return;
    }
    if (this.drillForm.get('characterId')?.value === 999) {
      console.error('Character ID is invalid');
      return;
    }
    let formattedTags = this.drillForm.get('tags')?.value;
    if (!Array.isArray(formattedTags)) {
      formattedTags = this.drillForm
        .get('tags')
        ?.value.split(',')
        .map((tag: string) => tag.trim());
    }
    this.drillForm?.get('tags')?.patchValue(formattedTags);
    console.log(this.drillForm?.value);
    this.drillService.writeDrillFile(this.getDrillFromDrillForm());
    // Send user back to the drill list for the character
    this.route.navigate(['/drills', this.drillForm.value.characterId]);
  }

  // Kinda useless for now, but I'll leave it here
  getDrillFromDrillForm(): Drill {
    return {
      id: this.drillForm?.value.id ?? 0,
      name: this.drillForm?.value.name ?? '',
      description: this.drillForm?.value.description ?? '',
      characterId: this.drillForm?.value.characterId ?? 0,
      tags: this.drillForm?.value.tags ?? [],
    };
  }
}
