import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,  DocumentData, } from '@angular/fire/compat/firestore';
import { collection, doc, DocumentReference, serverTimestamp, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

import { Observable, map, BehaviorSubject } from 'rxjs';

interface Data {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private afauth: AngularFireAuth,
    private db: Firestore,
    private angularfirestore: AngularFirestore

  ) {
    this.afauth.authState.subscribe(res => {
      this.email = res?.email;
    });
  }

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  email: string;

  async create(path: string, data: Data) {
    this.register(data.email, data.password);
    const link = data.email;
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

  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      this.loggedIn.next(true);
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      this.loggedIn.next(false);
      console.log("error en login: ", err);
      return null;
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.afauth.signOut();
    console.log('adios');
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  isLoggedIn(){
    return this.loggedIn$;
  }
  
  checkUserId(userId: string) {
    let user: string;
    this.afauth.authState.subscribe(res => {
      user = res?.email;
    });
    return user === userId;
  }

  getInfoUser(): Observable<User> {  
    const collection = this.angularfirestore.collection<User>('USERS', ref => ref.where('email', '==',  this.email));
    const user$ = collection
      .valueChanges()
      .pipe(
        map(users => {
          const user = users[0];
          return user;
        })
      );
    return user$;
  }
}
