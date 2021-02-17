import { Note } from './note.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notesChanged = new Subject<Note[]>();
  notes: Note[] = new Array<Note>();

  constructor() { }

  setNotes(note: Note[]) { 
    this.notes = note;
    this.notesChanged.next(this.notes.slice());
  }
 

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

    let newLength = this.notes.unshift(note);     ///unshift is used instead of push inorder for last entered note to come first//
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

 deleteNote(index : number){
  this.notes.splice(index,1);
  this.notesChanged.next(this.notes.slice());
}

}
