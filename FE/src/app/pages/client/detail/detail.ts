import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../../interface/products';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail { 
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
