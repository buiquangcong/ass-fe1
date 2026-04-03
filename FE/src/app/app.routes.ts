import { Routes } from '@angular/router';
import { Client } from './pages/client/client';
import { Home } from './pages/client/home/home';
import { Detail } from './pages/client/detail/detail';
import { Category } from './pages/client/category/category';
import { Cart } from './pages/client/cart/cart';
import { Adminlayout } from './layout/adminlayout/adminlayout';
import { Clientlayout } from './layout/clientlayout/clientlayout';
import { List } from './pages/admin/list/list';
import { Add } from './pages/admin/add/add';
import { Edit } from './pages/admin/edit/edit';


export const routes: Routes = [
    {
        path: '', component: Clientlayout, children: [
            { path: '', component: Home },
            { path: 'detail', component: Detail },
            { path: 'category', component: Category },
            { path: 'cart', component: Cart }
        ]
    },
    {
        path: 'admin', component: Adminlayout, children: [
            { path: 'list', component: List},
            { path: 'add', component: Add },
            { path: 'edit/:id', component: Edit },
            { path: 'cart', component: Cart }
        ]
    }
];
