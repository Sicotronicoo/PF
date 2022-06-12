import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,

  ) {

  }
  hide = true;

  ngOnInit(): void {
  }

  form = this.fb.group({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    admin: [false],
  })

  async save(event: Event){
    event.preventDefault();
    if(!this.form.invalid){
      const doc = await this.authService.create("USERS", this.form.value);
      const id = doc.id;
      this.router.navigate(["/main"]);
    }
  }
}