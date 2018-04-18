import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router} from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../shared/user';
import { HttpErrorResponse } from '@angular/common/http';
import { window } from 'rxjs/operator/window';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	isLogenError : boolean = false;
  constructor( private userService : UserService, private _router:Router,private _activatedRoute:ActivatedRoute) 
  {
    var userT=localStorage.getItem("userToken");
    //console.log(userT);
    if(userT!=null)
    {
      this._router.navigate(['/ads/']);
    }
    
   }

  user: User ;
  //email:string;
  ngOnInit() {
    this.user = new User();
  }

  onLogIn(username:string, userpass:string){
    
   this.userService.userAuthinticate(username,userpass).subscribe((data : any) => {
   	localStorage.setItem('userToken',data.access_token);

   	this.userService.testToken(data.access_token).subscribe((e : any) =>{
      localStorage.setItem('email',e.email);
      localStorage.setItem('role',e.role);
      localStorage.setItem('userID',e.userID);
      this._router.navigate(['/ads/']);
   	})
   },
   (err : HttpErrorResponse) => {
      console.log(err);
   		this.isLogenError = true;
   });
  
  }
}
