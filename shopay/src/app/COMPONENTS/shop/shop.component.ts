import { Component, OnInit,Input, ElementRef, ViewChild } from '@angular/core';
import { IBrands } from 'src/app/Shared/Modules/brands';
import { ICategory } from 'src/app/Shared/Modules/category';
import { IPagination } from '../../Shared/Modules/pagination';
import { IProduct } from '../../Shared/Modules/product';
import { ProductItemComponent } from './product-item/product-item.component';
import { ShopService } from './shop.service';
import { ShoppingCartService } from 'src/app/SERVICES/shopping-cart.service';
import { addToCart } from 'src/app/COMPONENTS/products/products.component';
import { ShoppingComponent } from 'src/app/PAGES/shopping/shopping.component';
import { ShopParams } from 'src/app/Shared/Modules/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    
  @ViewChild('search',{static:true}) searchTerm:ElementRef;

  products: IProduct[];

  brands:IBrands[];

  categories:ICategory[];

totalCount:number;

  shopParams=new ShopParams();

  sortOptions = [

    {name: 'Alphabetical',value:'name'},

    {name:'Price:Low to High',value:'priceAsc'},

    {name:'Price:High to Low',value:'priceDesc'}

  ];


 

  constructor(public shopping_cart: ShoppingCartService,public shopService: ShopService) {

 

   }

 

  ngOnInit(){

 

    this.getProducts();

    this.getBrands();

    this.getCategories();

 

  }

  getProducts(){

      this.shopService.getProducts(this.shopParams).subscribe((response:IPagination)=>{

      this.products=response.data;

      this.shopParams.pageNumber=response.pageIndex;

      this.shopParams.pageSize=response.pageSize;

      this.totalCount=response.count;

 

    

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

      this.categories=[{id:0,name:'All'},...response];


    }

    );

  }

  onBrandSelected(brandId:number){

   /*  this.brandIdSelected= brandId; */

        this.shopParams.brandId=brandId;

     /*  this.shopParams.pageNumber=1; */

    this.getProducts();

  }

  onCategorySelected(categoryId:number){

   /*  this.categoryIdSelected = categoryId; */

         this.shopParams.categoryId=categoryId;

     /*  this.shopParams.pageNumber=1; */

     this.getProducts();

  }

  onSortSelected(sort:string)

  {

    /* this.sortSelected=sort; */

          this.shopParams.sort=sort;

    /*   this.shopParams.pageNumber=1;  */

    this.getProducts();

}

onPageChanged(event:any){

  this.shopParams.pageNumber=event;

  this.getProducts();

}

 

onSearch(){

  this.shopParams.search=this.searchTerm.nativeElement.value;

  this.shopParams.pageNumber=1;

  this.getProducts();

}

 onReset(){

  this.searchTerm.nativeElement.value =  '';

  this.shopParams=new ShopParams();

  this.getProducts()

}
addToCart(p){
  this.shopping_cart.addProduct(p)
} 


 

}
































      
      

