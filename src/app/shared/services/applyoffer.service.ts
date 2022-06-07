import { Injectable } from '@angular/core';
import { DocumentData, AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, serverTimestamp, setDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Applyoffer } from './interfaces/applyoffer';



interface Data {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class ApplyofferService {

  constructor(
    private db: Firestore,
    private afs: AngularFirestore,
    private auth: AuthService
  ) { }

  async addApplyOffer(path: string, offerId: string, userId: string, userOffer: string) {
    const id = doc(collection(this.db, path)).id;

    const docData = {
      id,
      userOffer: userOffer,
      userId: userId,
      offerId: offerId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    const docRef = doc(this.db, path, id);
    return new Promise<DocumentReference<DocumentData>>(async (resolve) => {
      await setDoc(docRef, docData);
      resolve(docRef);
    });
  }

  getCandidatesOffer(){
    return this.afs
    .collection<Applyoffer>('APPLYSOFFER', ref => ref.where('userOffer', '==', this.auth.email))
    .snapshotChanges()
  }
}
