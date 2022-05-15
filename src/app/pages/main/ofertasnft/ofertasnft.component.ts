import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, where, doc, getDoc } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { Nft } from '../../../shared/services/interfaces/nft';
import { NftService } from '../../../shared/services/nft.service';



@Component({
  selector: 'app-ofertasnft',
  templateUrl: './ofertasnft.component.html',
  styleUrls: ['./ofertasnft.component.scss']
})

export class OfertasnftComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private fs: Firestore,
    private nftService: NftService,
  ) { }

  id: string;
  nameCrypto: string;
  nameNft: string;
  web: string;
  isShown: boolean = false ; // hidden by default
  toggleShow() {

    this.isShown = ! this.isShown;
    
    }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('nameNft');
    this.nftService.getByName(productIdFromRoute).subscribe(user => {
      this.id = user.id;
      this.nameCrypto = user.nameCrypto;
      this.nameNft = user.nameNft;
      this.web = user.web;
    });

    console.log(this.nftService.getByName('axie'));
  }
  getNewOffer(){

  };
}
