import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, setDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { OfferService } from './offer.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(
    private db: Firestore,
    private afs: AngularFirestore,
    private auth: AuthService,
    private offerService: OfferService
  ) { }
                      
  async addContrato(idApply: string, userId: string,userOffer: string, offerId:string, path: string) {
    const id = doc(collection(this.db, path)).id;
      
    const docData = {
      id: id,
      idApply: idApply,
      offerId: offerId,
      userId: userId,
      userOffer: userOffer,
    }
    const docRef = doc(this.db, path, id);
    return new Promise<DocumentReference<DocumentData>>(async (resolve) => {
      await setDoc(docRef, docData);
      resolve(docRef);
    });
  }
}
