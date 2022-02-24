import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './COMPONENTS/header/header.component';
import { HomeComponent } from './PAGES/home/home.component';
import { FooterComponent } from './COMPONENTS/footer/footer.component';
import { CheckoutComponent } from './PAGES/checkout/checkout.component';
import { LoginComponent } from './account/login/login.component';
import { BannerComponent } from './COMPONENTS/banner/banner.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './COMPONENTS/products/products.component';
import { CheckoutProductsComponent } from './COMPONENTS/checkout-products/checkout-products.component';
import { CheckoutSubtotalComponent } from './COMPONENTS/checkout-subtotal/checkout-subtotal.component';
//import { ShopComponent } from './COMPONENTS/shop/shop.component';
import { ShopModule } from './COMPONENTS/shop/shop.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShopComponent } from './COMPONENTS/shop/shop.component';
import { PaymentComponent } from './PAGES/payment/payment.component';
import { OrderComponent } from './PAGES/order/order.component';
import { InvoiceComponent } from './PAGES/invoice/invoice.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './Shared/Modules/shared.module';
//import { RegisterComponent } from './account/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { PagerComponent } from './Shared/components/pager/pager.component';
import { PagingHeaderComponent } from './Shared/components/paging-header/paging-header.component';
import { RegisterComponent } from './account/register/register.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CheckoutComponent,
    LoginComponent,
    BannerComponent,
    ProductsComponent,
    CheckoutProductsComponent,
    CheckoutSubtotalComponent,
    PaymentComponent,
    OrderComponent,
    InvoiceComponent,
    RegisterComponent
    //PagerComponent,
    //PagingHeaderComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    ShopModule,
    BrowserModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot(),
    PaginationModule.forRoot()
  ],
  
  exports: [BsDropdownModule,TooltipModule,ModalModule,ShopComponent,FormsModule,
    ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
//export class AppBootstrapModule{}