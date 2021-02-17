import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component ';
import { NoteListComponent } from './note-list/note-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteMainComponent } from './note-main/note-main.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

const routes: Routes = [
  { path: '',redirectTo:"notes",  pathMatch: 'full' },

  {
    path: 'notes', component: NoteMainComponent,
    canActivate: [AuthGuard],

    children: [
      { path: '', component: NoteListComponent, pathMatch: 'full' },
      { path: 'new', component: NoteDetailsComponent },
      { path: ':id', component: NoteDetailsComponent },
    ]
  },
  { path: 'auth', component: AuthComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
