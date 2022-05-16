import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/shared/services/interfaces/offer';
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
  ) {}

  routeParams = this.route.snapshot.paramMap;
  id = this.routeParams.get('nameNft');

  offers: Offer[];

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
}
