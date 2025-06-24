import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { AboutUs } from './pages/about-us/about-us';
import { Contact } from './pages/contact/contact';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { CartPage } from './pages/cart-page/cart-page';
import { Products } from './pages/products/products';
import { SingleProduct } from './pages/single-product/single-product';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'about-us', component: AboutUs },
  { path: 'contact', component: Contact },
  { path: 'products', component: Products },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'products/:id', component: SingleProduct },
  { path: 'cart', component: CartPage },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
