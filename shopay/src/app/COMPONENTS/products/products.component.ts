import { Component, OnInit,Input } from '@angular/core';
import { ShoppingCartService} from '../../SERVICES/shopping-cart.service';
export function addToCart(p){}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products: any [] = [];
  
  constructor(public shopping_cart: ShoppingCartService) { }

  ngOnInit(): void {
  }
  addToCart(p){
    this.shopping_cart.addProduct(p)
  }

}
