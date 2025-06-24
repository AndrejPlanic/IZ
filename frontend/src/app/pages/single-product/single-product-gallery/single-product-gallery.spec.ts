import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductGallery } from './single-product-gallery';

describe('SingleProductGallery', () => {
  let component: SingleProductGallery;
  let fixture: ComponentFixture<SingleProductGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleProductGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProductGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
