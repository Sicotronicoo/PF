import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, collection, setDoc, getDoc } from 'firebase/firestore';
import { Offer } from 'src/app/shared/services/interfaces/offer';
import { OfferService } from 'src/app/shared/services/offer.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Applyoffer } from 'src/app/shared/services/interfaces/applyoffer';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  offers: Offer[];
  applysOffer: Applyoffer[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private db: Firestore,
    private offerService: OfferService,


  ) {
    this.authService.getUserLogged().subscribe(res => {
      this.currentUser = res?.email;          
   });

  }

  id: string;
  email: string;
  displayName: string;
  currentUser: string;

  ngOnInit(): void {
    this.authService.getInfoUser().subscribe(user => {
      this.id = user.id;
      this.email = user.email;
      this.displayName = user.displayName;
    });
    
    this.offerService.getUserOffers().subscribe((res) => {
      this.offers = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Offer)
        };
      });
    }); 

    this.offerService.getApplysUser().subscribe((res) => {
      this.applysOffer = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Applyoffer)
        };
      });
    }); 
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
