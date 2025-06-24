import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingProductsSection } from './best-selling-products-section';

describe('BestSellingProductsSection', () => {
  let component: BestSellingProductsSection;
  let fixture: ComponentFixture<BestSellingProductsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestSellingProductsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestSellingProductsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
