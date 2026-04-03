import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../../interface/products';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-list',
  imports: [NzTableModule, NzButtonModule, NzPopconfirmModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  route = inject(ActivatedRoute)
  products: IProduct[] = [];
  changdt = inject(ChangeDetectorRef)
  http = inject(HttpClient)
    async ngOnInit(){
      const res = await fetch('http://localhost:3000/products');
      this.products = await res.json();
      this.changdt.markForCheck()
    }
    message = inject(NzMessageService)
   handleDelete = (id: number) => {
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
      next: () => {
        this.message.success('Xóa sản phẩm thành công')
        this.products = this.products.filter(item => item.id !== id)
        this.changdt.markForCheck()
      },
      error: () => {
        this.message.error('Xóa sản phẩm thất bại')
      }
    })
  }
}
