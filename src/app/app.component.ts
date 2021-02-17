
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
    export class AppComponent implements OnInit {
  title = 'notes-app';

  constructor(private authService: AuthService) { }

  ngOnInit() { 
    this.authService.autoLogin();
  }
}
