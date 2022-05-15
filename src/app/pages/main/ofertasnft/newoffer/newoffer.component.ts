import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NftService } from 'src/app/shared/services/nft.service';

@Component({
  selector: 'app-newoffer',
  templateUrl: './newoffer.component.html',
  styleUrls: ['./newoffer.component.scss'],
  
})
export class NewofferComponent implements OnInit {
  constructor(
    private nftService: NftService,
    private fb: FormBuilder,
    private route: ActivatedRoute,

  ) { }
   routeParams = this.route.snapshot.paramMap;
   id = this.routeParams.get('nameNft');

  form = this.fb.group({
    user: [null, Validators.required],
    porcentaje:[null, Validators.required],
    duracion:[null, Validators.required],
    descripcion:[null, Validators.required],
  })
  ngOnInit(): void {
     
    this.nftService.getOfferByName('axie').subscribe
  }

  async save(event: Event){
    event.preventDefault();
    if(!this.form.invalid){
      const doc = await this.nftService.createOffer("OFFERS", this.form.value, this.id);
      const id = doc.id;
      //const file = await this.storageService.uploadFile(`candidates/${id}/${Date.now()}_${this.file.name}`, this.file);
      //this.file = null;
      this.form.reset();
    }
  }
}
