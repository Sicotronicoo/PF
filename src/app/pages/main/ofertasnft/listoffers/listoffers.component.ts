import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ) {}

  routeParams = this.route.snapshot.paramMap;
  id = this.routeParams.get('nameNft');

  offers: Offer[];
  idOffer: string;
  ngOnInit(): void {
    this.offerService.getOffersByName(this.id).subscribe((res) => {
      this.offers = res.map( (e) =>{
        this.idOffer = e.payload.doc.id
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Offer)
        };
      });
    });
  }
  deleteOffer(){
    this.offerService.delete(this.idOffer);
  }
}
