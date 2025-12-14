import { Routes } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
import { CartComponent } from '../components/cart/cart.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
