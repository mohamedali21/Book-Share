import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User2Service } from '../../Service/user2.service';
import { Http ,Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  Interval:any;
  NumOfAds:number;
  NumOfReq:number;
  points:number;
  email:string;  
  constructor(private http:Http,private userService:User2Service,private _activatedRoute:ActivatedRoute, private _router:Router) { 
  }

  ngOnInit() {
    this.email=localStorage.getItem('email');
    this.Interval=setInterval(() => {
      this.userService.UserAciviesCount(Number(localStorage.getItem('userID'))).subscribe(
        data=>{this.NumOfAds=data.NumberOfAds;this.NumOfReq=data.NumberOfRequests;this.points=data.points;
        clearInterval(this.Interval);}
      );
      this.email=localStorage.getItem('email');
    }, 1000);
  }
  logout(){
  	localStorage.removeItem('userToken');
    localStorage.removeItem('email');
  	localStorage.removeItem('role');
  	localStorage.removeItem('userID');
  	this._router.navigate(['/ads/']);

  }
  update(){
    this.userService.UserAciviesCount(Number(localStorage.getItem('userID'))).subscribe(
      data=>{this.NumOfAds=data.NumberOfAds;this.NumOfReq=data.NumberOfRequests;this.points=data.points;
      clearInterval(this.Interval);
    });
  }
 
  userIsAdmin():boolean{
    if(localStorage.getItem('role') == 'admin'){
      return true;
    }
    else{
      return false;
    }
  }
  ngOnDestroy() {
    if (this.Interval) {
      clearInterval(this.Interval);
    }
  }
}
