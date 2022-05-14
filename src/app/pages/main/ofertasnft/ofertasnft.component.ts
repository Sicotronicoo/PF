import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, where, doc} from 'firebase/firestore';
import { Nft } from '../../../shared/services/interfaces/nft';

@Component({
  selector: 'app-ofertasnft',
  templateUrl: './ofertasnft.component.html',
  styleUrls: ['./ofertasnft.component.scss']
})
export class OfertasnftComponent implements OnInit {

  oferta: Nft | undefined;
  

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private fs: Firestore
    ) { 
      
    }
     
  ngOnInit(): void {

  }

}
