import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, serverTimestamp, setDoc } from 'firebase/firestore';


interface Data {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class ApplyofferService {

  constructor(
    private db: Firestore
  ) { }

  async addApplyOffer(path: string, offerId: string, userId: string) {
    const id = doc(collection(this.db, path)).id;

    const docData = {
      id,
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
}
