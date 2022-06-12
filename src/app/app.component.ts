import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../app/shared/services/auth.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'proyecto';
  isUserLoggedIn!: boolean;
  isAdmin!: boolean;

  constructor(
    public authService: AuthService
    ){
  }
  isAdmin$ = this.authService.isAdmin$;

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(
      (loggedIn) => (this.isUserLoggedIn = loggedIn)
    );
  }
 
}
