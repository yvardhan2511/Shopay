import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';


declare var FB: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];

  userInfo: any;

  constructor(public fb: FormBuilder, public accountService: AccountService, public router: Router,public toastr: ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
     (window as any).fbAsyncInit = function(){
      this.FB.init({
        appId   : '572986043323498',
        cookie  : true,
        xfbml   : true,
        version : 'v3.1'
      })
      this.FB.AppEvents.logPageView();
    };

    (function(d,s,id){
      var js,fjs = d.getElementsByTagName(s)[0];
      if(d.getElementById(id)) {return;}
      js=d.createElement(s); js.id=id;
      js.src= "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);

    }(document, 'script', 'facebook-jssdk'));
  }

  submitLogin(){
    console.log('submit login to facebook');
    FB.login((response) => {
      console.log('submitLogin', response);
      if(response.authResponse){
        //this.toastr.successToastr('login successful','Success');
      }
      else{
        //this.toastr.errorToastr('Login failed','Oops!');
      }
    });
  }
  submitUserInfo(userInfo){
    console.log(userInfo);
    //this.toastr.successToastr('login successful','Success!');
  }
  showError(){
    //this.toastr.errorToastr('This is error toast','Oops!');
  }
  showWarning(){
    //this.toastr.warningToastr('This is warning toast','Alert!');
  }
  
  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, 
        [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]
      ],
      password: [null, Validators.required]
    });
  }
  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/shop');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    })
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
               return res ? {emailExists: true} : null;
            })
          );
        })
      )
    }
  }
  

}