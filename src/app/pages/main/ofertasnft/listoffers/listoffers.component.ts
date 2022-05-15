import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/services/interfaces/offer';
import { NftService } from 'src/app/shared/services/nft.service';

@Component({
  selector: 'app-listoffers',
  templateUrl: './listoffers.component.html',
  styleUrls: ['./listoffers.component.scss']
})
export class ListoffersComponent implements OnInit {

  constructor(
    private nftService: NftService,
  ) { }

  offers: Offer[];
  ngOnInit(): void {
     this.nftService.getOffers().subscribe((res) => {
      this.offers = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Offer)
        };
      });
      console.log(this.offers);
    }) 
  }


}
