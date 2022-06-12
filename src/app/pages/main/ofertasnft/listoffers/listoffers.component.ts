import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { resolve } from 'dns';
import { collection, where, query} from 'firebase/firestore';
import { Subject, Subscription, switchMap } from 'rxjs';
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
    private applyofferservice: ApplyofferService,
    private afs: AngularFirestore,
    private db: Firestore,


  ) {
    this.authService.getUserLogged().subscribe(res => {
      this.currentUser = res?.email;          
   });
  }
  isUserApply$ = this.applyofferservice.checApply$;


  routeParams = this.route.snapshot.paramMap;
  id = this.routeParams.get('nameNft');
  offers: Offer[];

  currentUser: string;     
  idOffer: string;  
  userId: string;
  isUserLoggedIn!: boolean;
  isUserApply!: boolean;

  userApply!: boolean;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(
      (loggedIn) => (this.isUserLoggedIn = loggedIn)
    );

    this.offerService.getOffersByName(this.id).subscribe((res) => {
      this.offers = res.map( (e) =>{
       // console.log(this.currentUser, e.payload.doc.data().userId,  e.payload.doc.data().id);
        this.applyofferservice.test(this.currentUser, e.payload.doc.data().userId, e.payload.doc.data().id);
        let ext: boolean;
        this.applyofferservice.checApply$.subscribe(
          (loggedIn) => (ext = loggedIn, console.log(loggedIn)
          )
        );
        return{
          id: e.payload.doc.id,
          check: ext,
          ...(e.payload.doc.data() as Offer)
        };
      });
    });       
    
  }
  test(userOffer: string, offerId: string){

    
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

}