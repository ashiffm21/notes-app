import { Note } from './note.model';
import { NotesService } from './notes.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from './data-storage.service';

@Injectable({ providedIn: 'root' })
export class NoteResolverService implements Resolve<Note[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private notesService: NotesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const notes = this.notesService.getAll
      ();

    if (notes.length === 0) {
      return this.dataStorageService.fetchNotes();
    } else {
      return notes;
    }
  }
}
