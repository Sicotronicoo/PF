import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NftService } from 'src/app/shared/services/nft.service';
import { OfferService } from 'src/app/shared/services/offer.service';

@Component({
  selector: 'app-newoffer',
  templateUrl: './newoffer.component.html',
  styleUrls: ['./newoffer.component.scss'],
  
})
export class NewofferComponent implements OnInit {
  constructor(
    private offerService: OfferService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService

  ) {
    this.authService.getUserLogged().subscribe(res => {
      this.userId = res?.email;          
   });
   }

  routeParams = this.route.snapshot.paramMap;
  id = this.routeParams.get('nameNft');
  userId: string;
  isUserLoggedIn!: boolean;

  form = this.fb.group({
    porcentaje:[null, Validators.required],
    duracion:[null, Validators.required],
    descripcion:[null, Validators.required],
  })

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(
      (loggedIn) => (this.isUserLoggedIn = loggedIn)
    );
  }

  async save(event: Event){
    event.preventDefault();
    if(!this.form.invalid){
      const doc = await this.offerService.createOffer("OFFERS", this.form.value, this.id, this.userId);
      const id = doc.id;
      //const file = await this.storageService.uploadFile(`candidates/${id}/${Date.now()}_${this.file.name}`, this.file);
      this.form.reset();
      this.router.navigate(["/main"]);
    }
  }
}
