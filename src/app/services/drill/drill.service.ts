import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Filesystem,
  Directory,
  Encoding,
  ReaddirResult,
} from '@capacitor/filesystem';
import { map, Observable } from 'rxjs';
import { Drill } from 'src/app/models/Drill';

@Injectable({
  providedIn: 'root',
})
export class DrillService {
  http = inject(HttpClient);

  /**
   * Get all drills
   * @returns An observable of all drills in an array
   */
  getDrills(): Observable<Drill[]> {
    return this.http.get<Drill[]>('/assets/mock-data/drills.json');
  }

  /**
   * Get drills for a specific character
   * @param characterId The ID of the character to get drills for
   * @returns An observable of the drills for the character
   */
  getCharacterDrills(characterId: number): Observable<Drill[]> {
    return this.getDrills().pipe(
      map((drills) =>
        drills.filter((drill) => drill.characterId === characterId)
      )
    );
  }

  /**
   * Get a new drill ID from the latest drill in the list + 1
   * I don't think that this is going to be useful, but I'll leave it here for now
   */
  getNewDrillId(): Observable<number> {
    return this.getDrills().pipe(
      map((drills) => {
        const latestDrill = drills[drills.length - 1];
        return latestDrill.id + 1;
      })
    );
  }

  /**
   * Write a drill to a file
   * @param drill The drill to write to a file
   */
  async writeDrillFile(drill: Drill) {
    // Check if parent directory drills exists, if not create it
    try {
      await Filesystem.mkdir({
        path: 'drills',
        directory: Directory.Documents,
        recursive: false,
      });
    } catch (error) {
      console.error('Unable to create directory', error);
      throw error;
    }
    try {
      await Filesystem.writeFile({
        path: `drills/${drill.id}.json`,
        data: JSON.stringify(drill),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
    } catch (error) {
      console.error('Unable to write file', error);
      throw error;
    }
  }

  /**
   * Read a drill from a file
   * @param drillId The ID of the drill to read
   * @returns The drill object
   */
  async readDrillFile(drillId: number): Promise<Drill> {
    let file;
    try {
      file = await Filesystem.readFile({
        path: `drills/${drillId}.json`,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
    } catch (error) {
      console.error('Unable to read file', error);
      throw error;
    }
    if (typeof file.data === 'string') {
      return JSON.parse(file.data);
    } else {
      throw new Error(
        'File data is not a string, this should not happen since its a json file'
      );
    }
  }

  readDrillDirectory(): Promise<ReaddirResult> {
    return Filesystem.readdir({
      path: 'drills',
      directory: Directory.Documents,
    });
  }

  /**
   * Delete a drill file
   * @param drillId The ID of the drill to delete
   */
  async deleteDrillFile(drillId: number) {
    try {
      await Filesystem.deleteFile({
        path: `drills/${drillId}.json`,
        directory: Directory.Documents,
      });
    } catch (error) {
      console.error('Unable to delete file', error);
      throw error;
    }
  }
}
