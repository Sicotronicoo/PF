import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router

  ) { 
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('nameNft');
    this.nftService.getNftByName(productIdFromRoute).subscribe(user => {
      this.id = user.id;
      this.nameCrypto = user.nameCrypto;
      this.nameNft = user.nameNft;
      this.web = user.web;
      this.urlPhoto = user.urlPhoto;
    });
    if(this.delete){
    }
  }

  isAdmin$ = this.authService.isAdmin$;
  id: string;
  nameCrypto: string;
  nameNft: string;
  web: string;
  urlPhoto: string;
  isShown: boolean = false ; // hidden by default
  delete: boolean = false;
  isUserLoggedIn!: boolean;
  
  toggleShow() {
    this.isShown = ! this.isShown;    
  }
  ngOnInit(): void {   
    this.authService.loggedIn$.subscribe(
      (loggedIn) => (this.isUserLoggedIn = loggedIn)
    ); 
  }
  
 async deleteNft(){
    this.nftService.delete(this.nameNft);
    console.log('El NFT; ' + this.delete + ' ha sido borrado.');
  }

}
