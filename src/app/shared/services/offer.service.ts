import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Firestore, setDoc, getDoc } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, serverTimestamp, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Applyoffer } from './interfaces/applyoffer';
import { Offer } from './interfaces/offer';

interface Data {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  email: string;

  constructor(
    private db: Firestore,
    private angularFirestore: AngularFirestore,
    private afauth: AngularFireAuth,

  ) { 
    this.afauth.authState.subscribe(res => {
      this.email = res?.email;
    });
  }

  async createOffer(path: string, data: Data, nameNft: string, userId:string) {
    const id = doc(collection(this.db, path)).id;

    const docData = {
      ...data,
      id,
      nameNft: nameNft,
      userId: userId,
      open: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    const docRef = doc(this.db, path, id);
    return new Promise<DocumentReference<DocumentData>>(async (resolve) => {
      await setDoc(docRef, docData);
      resolve(docRef);
    });
  }
  updateOffer(data: boolean, offerId: string) {
    return this.angularFirestore
      .collection("OFFERS")
      .doc(offerId)
      .update({
        open: data,
      });
  }

  getOffers(){
    return this.angularFirestore
    .collection('OFFERS')
    .snapshotChanges()
  }

  getOffersByName(nameNft: string){
    return this.angularFirestore
    .collection<Offer>('OFFERS', ref => ref.where('nameNft', '==', nameNft).where('open', "==", true))
    .snapshotChanges()
  }

  delete(id: string){
    return deleteDoc(doc(this.db, "OFFERS", id));
  }

  getUserOffers(){
    return this.angularFirestore
    .collection<Offer>('OFFERS', ref => ref.where('userId', '==', this.email))
    .snapshotChanges()
  }

  getApplysUser(){
    return this.angularFirestore
    .collection<Applyoffer>('APPLYSOFFER', ref => ref.where('userId', '==', this.email))
    .snapshotChanges()
  }
 
}