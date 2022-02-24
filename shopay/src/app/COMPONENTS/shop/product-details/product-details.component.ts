import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Shared/Modules/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'src/app/SERVICES/shopping-cart.service';

@Component({

  selector: 'app-product-details',

  templateUrl: './product-details.component.html',

  styleUrls: ['./product-details.component.scss']

})

export class ProductDetailsComponent implements OnInit {

 

  product:IProduct;

 

  constructor(public shopping_cart: ShoppingCartService,public shopService: ShopService, private activateRoute:ActivatedRoute ) { }

 

  ngOnInit(): void {

    this.loadProduct();

  }

loadProduct()

{

  this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product=>{

    this.product=product;

  }

  );

}
addToCart(p){
  this.shopping_cart.addProduct(p)
} 
}