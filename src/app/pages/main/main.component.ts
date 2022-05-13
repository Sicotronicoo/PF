import { Component, OnInit } from '@angular/core';
import { NftService } from 'src/app/shared/services/nft.service';


import { Nft } from '../../shared/services/interfaces/nft'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  constructor(
    private nftService: NftService,    
  ) {}

   nfts: Nft[];

  ngOnInit() {
    //console.log(this.nftService.getNft());
    this.nftService.getNft().subscribe((res) => {
      this.nfts = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Nft)
        };
      });
      console.log(this.nfts);
    })
  }  
}
