import { Injectable, NgZone } from '@angular/core';
import { User } from './interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { AngularFirestore, AngularFirestoreDocument, DocumentData, } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { collection, doc, DocumentReference, serverTimestamp, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

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

  ) { }

    loggedIn: boolean = false;
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
      this.loggedIn = true;
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  getUserLogged() {
    return this.afauth.authState;
  }

  logout() {
    this.loggedIn = false;
    this.afauth.signOut();
    console.log('adios');
  }

  isLoggedIn(){
  return this.loggedIn;
  }
}
