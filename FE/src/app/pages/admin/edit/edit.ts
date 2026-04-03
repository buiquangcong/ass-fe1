import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../../interface/products';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ICategory } from '../../../interface/category';

@Component({
  selector: 'app-edit',
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule, NzSelectModule, RouterLink],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {
  productform = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl(''),
    price: new FormControl(0, Validators.required),
    description: new FormControl(''),
    category: new FormControl('', Validators.required)
  })
  route = inject(ActivatedRoute)
  router = new Router()

  categories: ICategory[] = []
  changdt = inject(ChangeDetectorRef)
  http = inject(HttpClient)
  id = this.route.snapshot.params['id']
  message = inject(NzMessageService)
  ngOnInit() {
    this.http.get<ICategory[]>('http://localhost:3000/category').subscribe({
      next: (data) => {
        this.categories = data
      }
    })
    this.http.get<IProduct>(`http://localhost:3000/products/${this.id}`).subscribe({
      next: (data) => {
        this.productform.controls.name.setValue(data.name)
        this.productform.controls.image.setValue(data.image)
        this.productform.controls.price.setValue(data.price)
        this.productform.controls.description.setValue(data.description)
        this.productform.controls.category.setValue(data.category)
        this.changdt.markForCheck()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  onSubmit = () => {
    const productdata = this.productform.value
    this.http.put(`http://localhost:3000/products/${this.id}`, productdata).subscribe({
      next: (data) => {
        console.log(data)
        this.message.success('Cập nhật sản phẩm thành công')
        this.router.navigate(['/admin/products'])
      },
      error: (err) => {
        console.log(err)
        this.message.error('Cập nhật sản phẩm thất bại')
      }
    })
  }
}
