import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomePage } from './pages/home-page/home-page';
import { Products } from './pages/products/products';
import { HeroSection } from './pages/home-page/components/hero-section/hero-section';
import { CategorySection } from './pages/home-page/components/category-section/category-section';
import { InfoSection } from './pages/home-page/components/info-section/info-section';
import { BestSellingProductsSection } from './pages/home-page/components/best-selling-products-section/best-selling-products-section';
import { Layout } from './layout/layout';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutUs } from './pages/about-us/about-us';
import { Contact } from './pages/contact/contact';
import { Map } from './pages/contact/map/map';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { HttpClientModule } from '@angular/common/http';
import { ProductCard } from './core/product-card/product-card';
import { CartPage } from './pages/cart-page/cart-page';
import { CartProductCard } from './pages/cart-page/cart-product-card/cart-product-card';
import { FilterComponent } from './pages/products/filter-component/filter-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleProduct } from './pages/single-product/single-product';
import { SingleProductGallery } from './pages/single-product/single-product-gallery/single-product-gallery';
import { FormsModule } from '@angular/forms';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { CheckoutForm } from './pages/cart-page/checkout-form/checkout-form';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chatbot } from './core/chatbot/chatbot';

@NgModule({
  declarations: [
    App,
    HomePage,
    Products,
    HeroSection,
    CategorySection,
    InfoSection,
    BestSellingProductsSection,
    Layout,
    Header,
    Footer,
    AboutUs,
    Contact,
    NotFoundPage,
    ProductCard,
    CartPage,
    CartProductCard,
    SingleProduct,
    SingleProductGallery,
    FilterComponent,
    Login,
    Signup,
    CheckoutForm,
    Chatbot,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Map,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
