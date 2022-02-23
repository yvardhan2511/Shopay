import { Component, OnInit,Input } from '@angular/core';
import { IBrands } from 'src/app/Shared/Modules/brands';
import { ICategory } from 'src/app/Shared/Modules/category';
import { IPagination } from '../../Shared/Modules/pagination';
import { IProduct } from '../../Shared/Modules/product';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShopService } from './shop.service';
import { ShoppingCartService } from 'src/app/SERVICES/shopping-cart.service';
import { addToCart } from 'src/app/COMPONENTS/products/products.component';
import { ShoppingComponent } from 'src/app/PAGES/shopping/shopping.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    
    products: IProduct[];
    brands: IBrands[] ;
    categories: ICategory[] ; 
    brandIdSelected=0; 
    categoryIdSelected=0;
    sortSelected='name';
    sortOptions = [
      {name:'Alphabetical',value:'name'},
      {name:'Price:Low to High',value:'priceAsc'},
      {name:'Price:High to Low',value:'priceDesc'}
    ];
    constructor(public shopping_cart: ShoppingCartService,public shopService: ShopService) { function myfunc() { console.log("hello"); } } ngOnInit() { this.getProducts(); this.getBrands(); this.getCategories(); }
    
    getProducts(){

      this.shopService.getProducts(this.brandIdSelected,this.categoryIdSelected,this.sortSelected).subscribe((response:IPagination)=>{
      
      this.products=response.data;
      
      console.log(response.data);
      
      },error=>{console.log(error)});
      
      }
      getBrands(){
      
      this.shopService.getBrands().subscribe((response)=>{
      
      this.brands=[{id:0,name:'All'},...response];
      
      }
      
      );
      
      }
      
      getCategories(){
      
      this.shopService.getCategory().subscribe((response)=>{
      
      this.categories=[{id:0,name:'All'},...response];;
      
      }
      
      );
      
      }
      
      onBrandSelected(brandId:number){
      
      this.brandIdSelected= brandId;
      
      this.getProducts();
      
      }
      
      onCategorySelected(categoryId:number){
      
      this.categoryIdSelected = categoryId;
      
      this.getProducts();
      
      }

      onSortSelected(sort:string)
      {
        this.sortSelected=sort;
        this.getProducts();
      }
      addToCart(p){
        this.shopping_cart.addProduct(p)
      }      
      }


