import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Firestore, setDoc, getDoc } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, serverTimestamp } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { Nft } from './interfaces/nft';

interface Data {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor(
    private db: Firestore,
    private angularFirestore: AngularFirestore,
  ) { }

  async create(path: string, data: Data) {
    const link = data.nameNft;
    const id = doc(collection(this.db, path)).id;

    const docData = {
      ...data,
      id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    const docRef = doc(this.db, path, link);
    return new Promise<DocumentReference<DocumentData>>(async (resolve) => {
      await setDoc(docRef, docData);
      resolve(docRef);
    });
    
  }
  async createOffer(path: string, data: Data) {
    const id = doc(collection(this.db, path)).id;

    const docData = {
      ...data,
      id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    const docRef = doc(this.db, path, id);
    return new Promise<DocumentReference<DocumentData>>(async (resolve) => {
      await setDoc(docRef, docData);
      resolve(docRef);
    });
  }
  getNft() {
    return this.angularFirestore
      .collection("GAMESNFT")
      .snapshotChanges()
  }
  getOffers(){
    return this.angularFirestore
    .collection('OFFERS')
    .snapshotChanges()
  }

  getByName(name: string): Observable<Nft> {
    const collection = this.angularFirestore.collection<Nft>('GAMESNFT', ref => ref.where('nameNft', '==', name))
    const user$ = collection
      .valueChanges()
      .pipe(
        map(users => {
          const user = users[0];
          console.log(user);
          return user;
        })
      );
    return user$;
  }


  updateNft(nft: Nft, id) {
    return this.angularFirestore
      .collection("GAMESNFT")
      .doc(id)
      .update({
        id: nft.id,
        updateAt: nft.updateAt,
        nameNft: nft.nameNft,
        nameCrypto: nft.nameCrypto,
        web: nft.web
      });
  }
  deleteNft(nft) {
    return this.angularFirestore
      .collection("GAMESNFT")
      .doc(nft.id)
      .delete();
  }
}

/*   getOfertas(fecha) {
    return this.angularFirestore.collection('GAMESNFT').doc(fecha).valueChanges()
    }  */