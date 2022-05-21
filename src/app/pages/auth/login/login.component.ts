import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,

  ) { }
  email: string;

  form = this.fb.group({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  ingresar() {
    this.authService.login(this.form.value.email, this.form.value.password).then(res => {
      console.log("se logeo", res);
      this.email = this.form.value.email;
      this.router.navigate(['main']);
    })
  }

}