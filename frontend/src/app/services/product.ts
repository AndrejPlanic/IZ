import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../envoirment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getFilteredProducts(
    categoryId?: string,
    subcategoryId?: string
  ): Observable<Product[]> {
    let params = new HttpParams();
    if (categoryId) params = params.set('category', categoryId);
    if (subcategoryId) params = params.set('subcategory', subcategoryId);

    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getTopProductsByQuantity(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/top-quantity`);
  }
}
