import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Offer } from 'src/app/shared/services/interfaces/offer';
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
    this.nftService.getNft().subscribe((res) => {
      this.nfts = res.map( (e) =>{
        return{
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Nft)
        };
      });
    })
  }  
}
