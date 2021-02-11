import { Note } from './note.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Note[] = new Array<Note>();

  constructor() { }
  
  getAll() { 
    return this.notes;
  }

  get(id: number) {
    return this.notes[id];
  }

  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  add(note: Note) { 
    // this will ad a note to the notes array and return the id o note
    // where the id = index

    let newLength = this.notes.push(note);
    let index = newLength - 1;
    return index;
  }

  update(id: number, title: string, body: string) { 
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  delete(id: number) { 
    this.notes.splice(id, 1);
  }



}
