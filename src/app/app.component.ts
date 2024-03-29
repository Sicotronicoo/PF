import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    public authService: AuthService,
    private router: Router,
    ){
  }
  isAdmin$ = this.authService.isAdmin$;

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(
      (loggedIn) => (this.isUserLoggedIn = loggedIn)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
 
}
