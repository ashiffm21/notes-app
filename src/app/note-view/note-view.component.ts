import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Note } from '../shared/note.model';
import { NotesService } from '../shared/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {
  note: Note;
  noteId: number;
  new: boolean;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

   

  }
  // onEdit() {
  //   this.router.navigate(['edit'], {relativeTo: this.route});
  // }
 

  //   onCancel() {
  //     this.router.navigateByUrl('/');
  //   }
  }

  
  // onDeleteRecipe(){
  //   this.recipeService.deleteRecipe(this.id);
  //   this.router.navigate(['/recipes']);
  // }