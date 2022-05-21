import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }
  
  obtenerUsuarioLogeado() {
    this.authService.getUserLogged().subscribe(res => {
      console.log(res?.email);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
