import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-product-gallery',
  standalone: false,
  templateUrl: './single-product-gallery.html',
  styleUrl: './single-product-gallery.css',
})
export class SingleProductGallery {
  @Input() product: any; // Accept product from parent

  images: string[] = [];
  currentIndex = 0;

  ngOnChanges() {
    if (this.product && this.product.images) {
      this.images = this.product.images;
    }
  }

  selectImage(index: number) {
    this.currentIndex = index;
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
