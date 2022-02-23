import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({

declarations: [

ShopComponent,

ProductItemComponent

],

imports: [

CommonModule,
MatButtonModule,
MatIconModule,
MatCardModule,

],

exports:[

ShopComponent

]

})

export class ShopModule { }