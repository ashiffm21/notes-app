import { NoteListComponent } from './note-list/note-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteMainComponent } from './note-main/note-main.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

const routes: Routes = [
  {
    path: '',
    component: NoteMainComponent,
    children: [
      { path: '', component: NoteListComponent },
      { path: 'new', component: NoteDetailsComponent },
      { path: ':id', component: NoteDetailsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
