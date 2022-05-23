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

  constructor(public authService: AuthService){

  }
  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(
      (loggedIn) => (this.isUserLoggedIn = loggedIn)
    );
  }

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;
  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }  
}
