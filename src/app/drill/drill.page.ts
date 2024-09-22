import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonMenuButton,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import {
  add,
  createOutline,
  cloudDownloadOutline,
  cloudUploadOutline,
  trashOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { DrillService } from '../services/drill/drill.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Drill } from '../models/Drill';
import { ReaddirResult } from '@capacitor/filesystem';

@Component({
  selector: 'app-drill',
  templateUrl: './drill.page.html',
  styleUrls: ['./drill.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonCheckbox,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonMenuButton,
  ],
})
export class DrillPage implements OnInit {
  drillService = inject(DrillService);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);

  drillList$?: Observable<Drill[]>;
  importedDrills?: Drill[];

  private readonly parsedCharacterId = Number.parseInt(
    this.activatedRoute.snapshot.params['characterId']
  );

  ngOnInit(): void {
    addIcons({
      add,
      'create-outline': createOutline,
      'cloud-download-outline': cloudDownloadOutline,
      'trash-outline': trashOutline,
    });
    if (!this.parsedCharacterId || isNaN(this.parsedCharacterId)) {
      console.error('No character ID provided');
      this.route.navigate(['/characters']);
    }
    this.fetchCharacterDrills(this.parsedCharacterId);
    // Only for testing purposes
    this.drillService
      .getNewDrillId()
      .pipe(take(1))
      .subscribe((id) => {
        console.log(`New drill ID: ${id}`);
      });
  }

  private fetchCharacterDrills(characterId: number) {
    this.drillList$ = this.drillService.getCharacterDrills(characterId);
  }

  checkboxClicked(drillId: number): void {
    console.log(`Checkbox clicked for drill ID ${drillId}`);
  }

  async importDrills() {
    console.log('Importing drills');
    let drillDirectory: ReaddirResult | undefined;
    try {
      drillDirectory = await this.drillService.readDrillDirectory();
    } catch (error) {
      console.error('Error importing drills:');
      throw error;
    }
    console.log('Drill directory:', drillDirectory);
    const importedDrillIdList = drillDirectory.files.map(
      (file) => file.name.split('.json')[0]
    );
    console.log('Imported drill IDs:', importedDrillIdList);
    const importedDrills = importedDrillIdList.map((id) => {
      const drillId = Number.parseInt(id);
      return this.drillService.readDrillFile(drillId);
    });
    this.importedDrills = await Promise.all(importedDrills);
    this.importedDrills = this.importedDrills.filter(
      (drill) => drill.characterId === this.parsedCharacterId
    );
  }

  async deleteDrill(drillId: number) {
    console.log(`Deleting drill ID ${drillId}`);
    try {
      await this.drillService.deleteDrillFile(drillId);
    } catch (error) {
      console.error('Error deleting drill:', error);
      throw error;
    }
    console.log(`Drill ID ${drillId} deleted`);
  }
}
