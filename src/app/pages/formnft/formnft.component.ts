import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NftService } from 'src/app/shared/services/nft.service';

@Component({
  selector: 'app-formnft',
  templateUrl: './formnft.component.html',
  styleUrls: ['./formnft.component.scss']
})
export class FormnftComponent implements OnInit {

  constructor(
    private nftService: NftService,
    private fb: FormBuilder,
  ) { }

  form = this.fb.group({
    nameNft: [null, Validators.required],
    nameCrypto: [null, Validators.required],
    web:[null, Validators.required]
  })
  ngOnInit(): void {
  }

  async save(event: Event){
    event.preventDefault();
    if(!this.form.invalid){
      const doc = await this.nftService.create("GAMESNFT", this.form.value);
      const id = doc.id;
      //const file = await this.storageService.uploadFile(`candidates/${id}/${Date.now()}_${this.file.name}`, this.file);
      //this.file = null;
      this.form.reset();
    }
  }
}
