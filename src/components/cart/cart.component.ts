import { Component, OnInit } from '@angular/core';
import { Product } from '../../app/core/products.model';
import { AppService } from '../../app/core/api.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(public apiService: AppService) {}

  ngOnInit() {
    this.cart = this.apiService.getCart();

    this.apiService.cart$.subscribe((data) => {
      this.cart = data;
    });
  }

  remove(index: number) {
    this.apiService.removeFromCart(index);
    Swal.fire({
      toast: true,
      icon: "success",
      title: "Maxsulotdan savatdan olindi ✅",
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
