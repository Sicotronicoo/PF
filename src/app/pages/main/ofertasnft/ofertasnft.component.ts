import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, where, doc, getDoc } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { Nft } from '../../../shared/services/interfaces/nft';
import { NftService } from '../../../shared/services/nft.service';
import { AuthService } from 'src/app/shared/services/auth.service';



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
    public nftService: NftService,
    public authService: AuthService,

  ) { }

  id: string;
  nameCrypto: string;
  nameNft: string;
  web: string;
  isShown: boolean = false ; // hidden by default
  delete: boolean = false;
  toggleShow() {
    this.isShown = ! this.isShown;    
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('nameNft');
    this.nftService.getNftByName(productIdFromRoute).subscribe(user => {
      this.id = user.id;
      this.nameCrypto = user.nameCrypto;
      this.nameNft = user.nameNft;
      this.web = user.web;
    });
    if(this.delete){
    }
  }
  
  deleteNft(){
    this.nftService.delete(this.nameNft);
    console.log('El NFT; ' + this.delete + ' ha sido borrado.');
  }

}
