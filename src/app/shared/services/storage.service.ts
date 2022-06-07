import { Injectable } from '@angular/core';
import { Storage, uploadBytesResumable, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
  ) { }
  
  async uploadFile(path: string, file: any){
    try {
      const storageRef = ref(this.storage, path);
      return await uploadBytesResumable(storageRef, file);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
