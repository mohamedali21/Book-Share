import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router} from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../shared/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private userService : UserService, private _router:Router,private _activatedRoute:ActivatedRoute) { }
  user: User;
  isLogenError : boolean = false;

  ngOnInit() {
  	this.user = new User();
  }

  Register(user:User){
    user.Role = "user";
    user.Id = 0;
    
    this.userService.addUser(user).subscribe((data : any) => {
      this.goToHome(data);
    },
    (err : HttpErrorResponse) => {
      console.log(err);
       this.isLogenError = true;
    });

  }

  goToHome(user){
    this.userService.userAuthinticate(user.Email,user.Pass).subscribe((data : any) => {
     localStorage.setItem('userToken',data.access_token);
     this.userService.testToken(data.access_token).subscribe((e : any) =>{
       // this.email = e;
       localStorage.setItem('email',e.email);
       localStorage.setItem('role',e.role);
       localStorage.setItem('userID',e.userID);
       this._router.navigate(['/ads/']);
     })
   },
   (err : HttpErrorResponse) => {
       this.isLogenError = true;
   });
      
  }


}
