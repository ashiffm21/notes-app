import { AlertComponent } from './shared/alert/alert.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth/auth.component ';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NoteMainComponent } from './note-main/note-main.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteItemComponent } from './note-item/note-item.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoteMainComponent,
    NoteListComponent,
    NoteItemComponent,
    NoteDetailsComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,  
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
