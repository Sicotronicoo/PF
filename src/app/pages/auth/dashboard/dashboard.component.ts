import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Offer } from 'src/app/shared/services/interfaces/offer';
import { OfferService } from 'src/app/shared/services/offer.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Applyoffer } from 'src/app/shared/services/interfaces/applyoffer';
import { ApplyofferService } from 'src/app/shared/services/applyoffer.service';
import { ContratoService } from 'src/app/shared/services/contrato.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  offers: Offer[];
  applysOffer: Applyoffer[];
  candidates: Applyoffer[];
  constructor(
    private authService: AuthService,
    private offerService: OfferService,
    private applysOfferService: ApplyofferService,
    private contratoService: ContratoService,


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
    
    this.applysOfferService.getCandidatesOffer().subscribe((res) => {
      this.candidates = res.map( (e) => {
        return {
          id:e.payload.doc.id,
          ...(e.payload.doc.data() as Applyoffer)
        };
      });
    });
  }
  


  async saveContrato(idApply: string, userId: string,userOffer: string, offerId:string){
    await this.offerService.updateOffer(false, offerId);

    await this.contratoService.addContrato(idApply, userId, userOffer, offerId, "CONTRATOS");

  }

}
