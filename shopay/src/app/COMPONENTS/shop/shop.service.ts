import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IBrands } from 'src/app/Shared/Modules/brands';
import { ICategory } from 'src/app/Shared/Modules/category';
import { IPagination } from '../../Shared/Modules/pagination';

@Injectable({

    providedIn: 'root'

})





export class ShopService {baseUrl = 'https://localhost:5001/api/'constructor(private http: HttpClient) { }getProducts(brandId?: number,categoryId?: number,sort?:string){
    let params = new HttpParams();
    if(brandId){
        params=params.append('brandId',brandId.toString());
    }
    if(categoryId){
        params=params.append('categoryId',categoryId.toString());
    }
    if(sort){
        params=params.append('sort',sort);
    }
    return this.http.get<IPagination>(this.baseUrl+'products?PageSize=15' ,{observe:'response',params} )
    .pipe(
        map(response=>{
            return response.body;
        }
    )
        ); }getBrands(){return this.http.get<IBrands[]>(this.baseUrl+'products/brands');}getCategory(){return this.http.get<ICategory[]>(this.baseUrl+'products/categories');}}



