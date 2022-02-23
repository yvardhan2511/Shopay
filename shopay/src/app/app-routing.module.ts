import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './PAGES/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { CheckoutComponent } from './PAGES/checkout/checkout.component';
import { ShopComponent } from './COMPONENTS/shop/shop.component';
import { PaymentComponent } from './PAGES/payment/payment.component';
import {OrderComponent } from './PAGES/order/order.component';
import { InvoiceComponent } from './PAGES/invoice/invoice.component';
import { RegisterComponent } from './PAGES/register/register.component';
const routes: Routes = [
  {path:'', component: HomeComponent },
  { path:'login', component: LoginComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'order', component: OrderComponent },
  { path: 'invoice', component: InvoiceComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
