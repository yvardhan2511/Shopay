import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { ShoppingCartService } from 'src/app/SERVICES/shopping-cart.service';
import { IUser } from 'src/app/Shared/Modules/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<IUser>;

  constructor(public shoppingCart: ShoppingCartService,public accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$= this.accountService.currentUser$;
  }
  logout(){
    this.accountService.logout();
  }

}
