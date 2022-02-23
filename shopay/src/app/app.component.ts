import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopay';
  constructor(public accountService: AccountService) { }
  ngOnInit():void {
    this.loadCurrentUser();
  }
  loadCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.accountService.loadCurrentUser(token).subscribe(() =>{
        console.log('loaded user');
      },error => {
        console.log(error);
      });
    }
  }
}
// export class AppComponent implements OnInit {
//   title = 'client';
//   products: any[]=[];

//   constructor(private http: HttpClient){}

//   ngOnInit(): void {
//    this.http.get('https://localhost:5001/api/products').subscribe((response:any)=>{
//      //this.products=response.data 
//      console.log(response)
//    },(error:any)=>{
//      console.log(error);
//    });
//   }  
// }
