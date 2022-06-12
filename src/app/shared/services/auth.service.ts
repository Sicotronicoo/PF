import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData, } from '@angular/fire/compat/firestore';
import { collection, doc, DocumentReference, onSnapshot, serverTimestamp, setDoc, query, where, getDoc } from 'firebase/firestore';
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

  private isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdmin.asObservable();
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
      this.isUserAdmin(email);
      const q = this.isUserAdmin(email);

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
    this.isAdmin.next(false);
    this.afauth.signOut();
    console.log('adios');
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  isLoggedIn() {
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
    const collection = this.angularfirestore.collection<User>('USERS', ref => ref.where('email', '==', this.email));
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


  async isUserAdmin(email: string) {

    const docRef = doc(this.db, `USERS/${email}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if(docSnap.get('admin') == true){
        this.isAdmin.next(true);
        console.log(this.isAdmin.value);        
      }else{
        this.isAdmin.next(false);
        console.log(this.isAdmin.value);
      }
    } else {
      this.isAdmin.next(false);
      console.log("No such document!");
    }


    /* const q = query(collection(this.db, "USERS"), where("admin", "==", true), where('email', "==", email));
      onSnapshot(q, (snapshot)=>{
        console.log(snapshot.size);      
        if(snapshot.size > 0){     
          console.log('User match');        
          this.isAdmin.next(true);
        }else{
          console.log('No admin');
          this.isAdmin.next(false);
        }
      }) */
          /* const q = query(collection(this.db, "USERS"), where("admin", "==", true), where('email', "==", email));
    let size: number;
    onSnapshot(q, (snapshot)=>{
      size = snapshot.size;
      console.log(snapshot.size);
    })
    console.log(size);
    
    return size; */
  }
}
