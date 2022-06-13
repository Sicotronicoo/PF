import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { NftService } from 'src/app/shared/services/nft.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-formnft',
  templateUrl: './formnft.component.html',
  styleUrls: ['./formnft.component.scss']
})
export class FormnftComponent implements OnInit {

  file: File;

  constructor(
    private nftService: NftService,
    private fb: FormBuilder,
    private router: Router,
    private storagae: StorageService,
  ) { }

  form = this.fb.group({
    nameNft: [null, Validators.required],
    nameCrypto: [null, Validators.required],
    web:[null, Validators.required],
    urlPhoto: [null, Validators.required],
  })

  ngOnInit(): void {

  }

  async save(event: Event){
    event.preventDefault();
    if(!this.form.invalid){
      const storage = getStorage();
      await this.storagae.uploadFile(`GAMESNFT/${this.file.name}`, this.file);
      await getDownloadURL(ref(storage, `GAMESNFT/${this.file.name}`))
        .then((url) => {
          this.form.get('urlPhoto').patchValue(url);
        });
      await this.nftService.create("GAMESNFT", this.form.value);
      this.router.navigate(["/main"]);
    }
  }
   
  loadFile(e: Event) {
    const inputFile = e.target as HTMLInputElement;
    if (inputFile.files[0].size > 0 && inputFile.files[0].size < 33554432) {
      this.file = inputFile.files[0];
    }
    this.form.get('urlPhoto').patchValue(this.file.name); 
  }
}
