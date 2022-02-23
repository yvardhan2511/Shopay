import { Component, Input, OnInit } from '@angular/core';

import { IProduct } from 'src/app/Shared/Modules/product';




@Component({

selector: 'app-product-item',

templateUrl: './product-item.component.html',

styleUrls: ['./product-item.component.scss']

})

export class ProductItemComponent implements OnInit {

@Input() products:IProduct[] | undefined;



constructor() { }



ngOnInit(): void {

}



}