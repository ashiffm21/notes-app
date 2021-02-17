import { EventEmitter } from '@angular/core';
import { NotesService } from './../shared/notes.service';
import { Note } from './../shared/note.model';
import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  noteId: number;
  new: boolean;
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //to find out if its creating a new note or editing an existing one
    this.route.params.subscribe((params: Params) => {
      this.note = new Note();

      if (params.id) {
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      } else {
        this.new = true;
      }
    });

  }

  onSubmit(form: NgForm) {
    if (this.new) {
      this.notesService.add(form.value);
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body);
    }
    this.router.navigateByUrl('/');

  }

    onCancel() {
      this.router.navigateByUrl('/');
    }
    onDeleteNote() { 
      this.notesService.deleteNote(this.noteId);
      this.router.navigate(['/']);
    }
    }
  

