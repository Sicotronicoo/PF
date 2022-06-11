import { Injectable, OnDestroy } from '@angular/core';
import { DocumentData, AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, serverTimestamp, setDoc, query, where, getDocs, getDoc, QueryDocumentSnapshot, onSnapshot  } from 'firebase/firestore';
import { BehaviorSubject, flatMap, map, Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Applyoffer } from './interfaces/applyoffer';



interface Data {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class ApplyofferService implements OnDestroy {

  constructor(
    private db: Firestore,
    private afs: AngularFirestore,
    private auth: AuthService
  ) { 
  }

  private apply = new BehaviorSubject<boolean>(false);
  checApply$ = this.apply.asObservable();
  ngOnDestroy(): void {
    
  }

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

  checkCandidateApply(){
    const querySnapshot = getDocs(query(collection(this.db, "APPLYSOFFER"), where("userId", "==", "test@test.com"), where("userOffer", "==", "luis@luis.com")));
    return querySnapshot.then( data => { 
      console.log(data.size.valueOf());
      return Promise.resolve(data.size.valueOf())
    });
 }
 test(){
  let t: number;
  const q = query(collection(this.db, "APPLYSOFFER"), where("userId", "==", "test@test.com"), where("userOffer", "==", "luis@luis.com"));
  onSnapshot(q, (snapshot)=>{
    const y = snapshot.size
    console.log(t);
    t = y;
  })
  return t
}



checkApplys(): Observable<Applyoffer> {
  const collection = this.afs.collection<Applyoffer>('GAMESNFT', ref => ref.where('userId', '==', "test@test.com").where("userOffer", "==", "luis@luis.com"))
  const applyOffer$ = collection
    .valueChanges()
    .pipe(
      map(offer => {
        const user = offer[0];
        console.log(offer);
        return user;
      })
    );
  return applyOffer$;
}
 
  
}
