import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyofferService } from 'src/app/shared/services/applyoffer.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Offer } from 'src/app/shared/services/interfaces/offer';
import { NftService } from 'src/app/shared/services/nft.service';
import { OfferService } from '../../../../shared/services/offer.service'

@Component({
  selector: 'app-listoffers',
  templateUrl: './listoffers.component.html',
  styleUrls: ['./listoffers.component.scss']
})
export class ListoffersComponent implements OnInit {

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

  routeParams = this.route.snapshot.paramMap;
  id = this.routeParams.get('nameNft');
  offers: Offer[];

  currentUser: string;     
  idOffer: string;  
  userId: string;

  ngOnInit(): void {
    this.offerService.getOffersByName(this.id).subscribe((res) => {
      this.offers = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Offer)
        };
      });
    });       
  }
  
  deleteOffer(idOffer: string){
    this.offerService.delete(idOffer);
  }

  async save(idOffer: string){
    const doc = await this.applyofferservice.addApplyOffer("APPLYSOFFER", idOffer, this.currentUser);
   // this.router.navigate(["main"]);
  }
  checkUserId(userId:string){     
    return this.currentUser === userId;
  }
}