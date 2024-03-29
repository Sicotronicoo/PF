import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplyofferService } from 'src/app/shared/services/applyoffer.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Applyoffer } from 'src/app/shared/services/interfaces/applyoffer';
import { Offer } from 'src/app/shared/services/interfaces/offer';
import { NftService } from 'src/app/shared/services/nft.service';
import { OfferService } from '../../../../shared/services/offer.service'

@Component({
  selector: 'app-listoffers',
  templateUrl: './listoffers.component.html',
  styleUrls: ['./listoffers.component.scss']
})
export class ListoffersComponent implements OnInit, OnDestroy  {

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    public nftService: NftService,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private applyofferservice: ApplyofferService
  ) {
    this.authService.getUserLogged().subscribe(res => {
      this.currentUser = res?.email;          
   });
  }

  isAdmin$ = this.authService.isAdmin$;
  routeParams = this.route.snapshot.paramMap;
  id = this.routeParams.get('nameNft');
  offers: Offer[];
  currentUser: string;     
  idOffer: string;  
  userId: string;
  isUserLoggedIn!: boolean;
  applyOffers: Applyoffer[];

  ngOnInit(): void {
     this.applyofferservice.getApplyOfferByUser().subscribe((res) => {
      this.applyOffers =  res.map((e) => {
        return e.payload.doc.data();
      });
    });
    this.offerService.getOffersByName(this.id).subscribe((res) => {
      this.offers = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Offer)
        };
      });
    });       
    this.authService.loggedIn$.subscribe(
      (loggedIn) => (this.isUserLoggedIn = loggedIn)
    );
  }
  ngOnDestroy() {

  }

  deleteOffer(idOffer: string){
    this.offerService.delete(idOffer);
  }

  async save(idOffer: string, userId: string){
    await this.applyofferservice.addApplyOffer("APPLYSOFFER", idOffer, this.currentUser, userId);
  }
  checkUserId(userId:string){     
    return this.currentUser === userId;
  }

  isUserApply(offerId: string) {    
    return this.applyOffers.some((apply) =>{
      return apply.offerId === offerId;
    });
  }

  deleteApplyUser(offerId: string){
    this.applyOffers.some((apply) =>{
      if(apply.offerId === offerId){
        this.applyofferservice.deleteApplyUser(apply.id);
      }
    });
  }
    
}