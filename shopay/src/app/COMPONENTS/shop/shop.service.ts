import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IBrands } from 'src/app/Shared/Modules/brands';
import { ICategory } from 'src/app/Shared/Modules/category';
import { IProduct } from 'src/app/Shared/Modules/product';
import { IPagination } from '../../Shared/Modules/pagination';
import { ShopParams } from '../../Shared/Modules/shopParams';

@Injectable({

    providedIn: 'root'

})





export class ShopService { baseUrl = 'https://localhost:5001/api/'

constructor(private http: HttpClient) { }

getProducts(shopParams: ShopParams) {

  let params = new HttpParams();



  if (shopParams.brandId !== 0) {

    params = params.append('brandId', shopParams.brandId.toString());

  }

  if (shopParams.categoryId !== 0) {

    params = params.append('categoryId', shopParams.categoryId.toString());

  }

  if (shopParams.sort) {

    params = params.append('sort', shopParams.sort);

  }

params=params.append('pageIndex',shopParams.pageNumber.toString());

params=params.append('pageIndex',shopParams.pageNumber.toString());

  if(shopParams.search){

    params=params.append('search',shopParams.search);

  }
    return this.http.get<IPagination>(this.baseUrl+'products?PageSize=15' ,{observe:'response',params} )
    .pipe(
        map(response=>{
            return response.body;
        }
    )
        ); }
        
    getProduct(id: number) {return this.http.get<IProduct>(this.baseUrl + 'products/' + id);}


        getBrands(){return this.http.get<IBrands[]>(this.baseUrl+'products/brands');}getCategory(){return this.http.get<ICategory[]>(this.baseUrl+'products/categories');}}



