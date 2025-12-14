import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private API_URL = 'https://fakestoreapi.com/products';
  private storageKey = 'cart';

  private cartSubject = new BehaviorSubject<Product[]>(
    JSON.parse(localStorage.getItem(this.storageKey) || '[]')
  );

  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  getCart(): Product[] {
    return this.cartSubject.value;
  }

  addToCart(product: Product) {
    const updatedCart = [...this.cartSubject.value, product];
    this.cartSubject.next(updatedCart);
    this.sync(updatedCart);
  }

  removeFromCart(index: number) {
    const updatedCart = [...this.cartSubject.value];
    updatedCart.splice(index, 1);
    this.cartSubject.next(updatedCart);
    this.sync(updatedCart);
  }

  getCartCount(): number {
    return this.cartSubject.value.length;
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce((sum, p) => sum + p.price, 0);
  }

  private sync(cart: Product[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }
}
