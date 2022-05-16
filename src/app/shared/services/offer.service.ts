import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Firestore, setDoc, getDoc } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, serverTimestamp, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { Offer } from './interfaces/offer';

interface Data {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  constructor(
    private db: Firestore,
    private angularFirestore: AngularFirestore,

  ) { }

  async createOffer(path: string, data: Data, nameNft: string) {
    const id = doc(collection(this.db, path)).id;

    const docData = {
      ...data,
      id,
      nameNft: nameNft,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    const docRef = doc(this.db, path, id);
    return new Promise<DocumentReference<DocumentData>>(async (resolve) => {
      await setDoc(docRef, docData);
      resolve(docRef);
    });
  }

  getOffers(){
    return this.angularFirestore
    .collection('OFFERS')
    .snapshotChanges()
  }

  getOffersByName(nameNft: string){
    return this.angularFirestore
    .collection<Offer>('OFFERS', ref => ref.where('nameNft', '==', nameNft))
    .snapshotChanges()
  }
  delete(id: string){
    return deleteDoc(doc(this.db, "OFFERS", id));
  }

}

