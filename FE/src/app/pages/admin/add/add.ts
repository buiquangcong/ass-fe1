import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ICategory } from '../../../interface/category';

@Component({
  selector: 'app-add',
  imports: [NzFormModule, ReactiveFormsModule, RouterLink, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {
  productform = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl(''),
    price: new FormControl('', Validators.required),
    description: new FormControl(''),
    category: new FormControl('', Validators.required)
  })
  http = inject(HttpClient)
  message = inject(NzMessageService)
  route = new Router()
  categories: ICategory[] = []
  onSubmit= () => {
    const productdata = this.productform.value
    this.http.post(`http://localhost:3000/products`, productdata).subscribe({
      next: () => {
        this.message.success('Thêm sản phẩm thành công')
        this.route.navigate(['/admin/list'])
      },
      error: () => {
        this.message.error('Thêm sản phẩm thất bại')
      }
    })
  }

  ngOnInit() {
    this.http.get<ICategory[]>('http://localhost:3000/category').subscribe({
      next: (data) => {
        this.categories = data
      }
    })
  }
}
