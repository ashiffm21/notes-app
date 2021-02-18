import { NotesService } from './../shared/notes.service';
import { Note } from './../shared/note.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import {PageEvent } from '@angular/material/paginator';

import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      //Entry Animation
      transition('void=> *', [
        //Initial State
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          //expand padding property
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),

        //animate spacing
        animate(
          '50ms',
          style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*',
          })
        ),

        animate(70),
      ]),

      transition('*=> void', [
        //first scale up

        animate(
          50,
          style({
            transform: 'scale(1.05)',
          })
        ),
        //then scale down to nomal size while begning to fade out
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        //scale down and fade out completely
        animate(
          '120ms ease',
          style({
            transform: 'scale(0.68)',
            opacity: 0,
          })
        ),
        //then animate the spacing.. includes height , margin & padding
        animate(
          '150ms ease-out',
          style({
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            'margin-bottom': 0,
          })
        ),
      ]),
    ]),

    trigger('listAnim', [
      transition('*=> *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0
            }),
            stagger(100, [animate('0.2s ease')]),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = new Array<Note>();

  filteredNotes: Note[] = new Array<Note>();

  @ViewChild('filterInput') filterInputElRef: ElementRef<HTMLInputElement>;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    //retrive all the notes from NotesService
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notesService.getAll();
    // this.filter('');

    this.notesService.notesChanged.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
        this.filteredNotes=notes
      }
    )
  }

  

  deleteNote(note: Note) {
    let noteId = this.notesService.getId(note);
    this.notesService.delete(noteId);
    this.filter(this.filterInputElRef.nativeElement.value);    
  }

  generateNoteURL(note: Note) { 
    let noteId = this.notesService.getId(note);
    return noteId;
  }

  // onPageChange(event: PageEvent) { }

  // currentDate = new Date();

  


                                            //Filter Method//
  
  filter(query: string) { 
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();

    //split up the search query into individual words

    let terms: string[] = query.split(''); // split into spaces
    //remove duplicat search terms
    terms = this.removeDuplicates(terms);
    //compile all relevant results into allResults array
    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      //append results to the allResults array
      allResults = [...allResults, ...results]
    });

    //allResults will include duplicate notes
    //bcz partiular note can be the reults of many search terms
    //remove duplicates

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    // now sort by relevance

    this.sortByRelavance(allResults);
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();

    //loop through the input arry and add the items to the set

    arr.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);

  }

  relevantNotes(query: string) : Array<Note> { 
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => { 
      if (note.title && note.title.toLowerCase().includes(query)) { 
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query)) { 
        return true;
      }
      return false;
    })

    return relevantNotes;
  }


  sortByRelavance(searchResults: Note[]) { 
    //this will calculate the relavance of he based on number of times it appears in the sarch results//

    let noteCountObj: object = {}; //format= key:value=> NoteId:number (note object id : count)

    searchResults.forEach(note => { 
      let noteId = this.notesService.getId(note); // get the note id

      if (noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      } else { 
        noteCountObj[noteId] = 1;
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => { 
      let aId = this.notesService.getId(a);
      let bId = this.notesService.getId(b);

      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];

      return bCount - aCount;

    })
  }
 
}
