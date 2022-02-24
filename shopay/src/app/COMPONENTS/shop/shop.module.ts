import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/Shared/Modules/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
@NgModule({

declarations: [

ShopComponent,

ProductItemComponent,
  ProductDetailsComponent

],

imports: [

CommonModule,
MatButtonModule,
MatIconModule,
MatCardModule,
SharedModule,
RouterModule

],

exports:[

ShopComponent


]

})

export class ShopModule { }