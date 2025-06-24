import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../envoirment';

export interface Category {
  _id: string;
  name: string;
  description: string;
  image_path: string;
  parent: string | null;
}

export interface FilterItem {
  category: {
    id: string;
    name: string;
  };
  subcategories: Array<{
    id: string;
    name: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.apiUrl + '/api/categories';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getMainCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/main`);
  }

  getFilterItems() {
    return this.http.get<FilterItem[]>(`${this.apiUrl}/cat-sub`);
  }
}
