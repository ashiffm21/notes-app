import { tap } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { Note } from './note.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private noteService: NotesService,
     private authService: AuthService
  )
    {}

  storeNotes() {
    const Note = this.noteService.getAll();
    this.http
      .put(
        ' https://note-app-project-36214-default-rtdb.firebaseio.com/notes.json',
        Note
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchNotes() {
    return this.http
      .get<Note[]>(
        'https://note-app-project-36214-default-rtdb.firebaseio.com/notes.json'
      ).pipe(
          tap(notes => {
              this.noteService.setNotes(notes);
          })
      );
  }
}


