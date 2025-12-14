import { Component, OnInit } from '@angular/core';
import { Product } from '../../app/core/products.model';
import { AppService } from '../../app/core/api.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  loading = true;

  constructor(public apiService: AppService) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data;
      this.loading = false;

    });
  }

  add(product: Product) {
    this.apiService.addToCart(product);
    Swal.fire({
      toast: true,
      icon: "success",
      title: "Mahsulot savatga qo'shildi ✅",
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
