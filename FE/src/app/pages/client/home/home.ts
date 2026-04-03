import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { IProduct } from '../../../interface/products';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  route = inject(ActivatedRoute)
  products: IProduct[] = [];
  changdt = inject(ChangeDetectorRef)
  http = inject(HttpClient)
    async ngOnInit(){
      const res = await fetch('http://localhost:3000/products');
      this.products = await res.json();
      this.changdt.markForCheck()
    }
 }
