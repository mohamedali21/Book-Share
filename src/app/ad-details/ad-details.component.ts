import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../Service/ads.service'
import { Observable } from 'rxjs'
import { Book } from '../Shared/book';
import { BookDetails } from '../Shared/book-details';
import { RequestService } from '../Service/request.service';
import { BookReq } from '../Shared/bookReq';
import { ReviewService } from '../Service/review.service';
import { Review } from '../Shared/Review';
import { User2Service } from '../Service/user2.service';
@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  req:BookReq;
  reqFalg:boolean;
  book:BookDetails;
  btnEnable:boolean;
  btnReq:boolean;
  message:string;
  reviews:Review[];
  reviewFlag:boolean;
  pointsFlag:boolean;
  points:number;
  bookPoints:number;
  constructor(private userService:User2Service,private reviewService:ReviewService,private bookService:AdsService,private _activatedRoute:ActivatedRoute,private requestService:RequestService) {
    this.req=new BookReq(); 
    this.btnEnable=true;
    this.btnReq=false;
    this.reviewFlag=false;
    this.pointsFlag=false;
  }
  
  ngOnInit() {
    let sentId=this._activatedRoute.snapshot.params["id"];
    this.bookService.getBook(sentId).subscribe(data=>{this.book=data;
      this.req.Book_Id=data.BookID;
      this.req.Seller_Id=data.UserID;
      this.req.Offer_Points=this.book.Points;
      this.req.Requester_Id=Number(localStorage.getItem('userID'));
      this.reviewService.UserReviews(data.UserID).subscribe(data=>{
        if(data!=null)
        {
          this.reviews=data;
          if(data.length!=0)
          {
            this.reviewFlag=true;
          }
        }
        this.userService.UserAciviesCount(Number(localStorage.getItem('userID'))).subscribe(
          data=>{this.points=data.points;
            if(this.book.Points <= this.points)
            {
              this.pointsFlag=true;
              console.log("points: "+this.book.Points)
            }else{
              this.pointsFlag=false;
            }
            console.log("points: "+this.pointsFlag)
          });
      });
      if(Number(localStorage.getItem('userID'))==this.book.UserID)
      {
        this.btnReq=false;
      }else{
        this.btnReq=true;
      }
      console.log("Seller_Id: "+this.book.UserID);
      console.log("RequesterId: "+Number(localStorage.getItem('userID'))); 
      console.log("btnReq: "+this.btnReq);                 
      this.requestService.Check(this.req).subscribe(data => {this.reqFalg=data;console.log(data);});
    });
    
  }
  Remove(){
    this.btnEnable=false;
    this.requestService.deleteRequest(this.req.Book_Id,this.req.Requester_Id).subscribe(
      data => {
        //window.location.reload();
        this.toggleReqeustBtn();
        this.btnEnable=true;
      }
   );
   
    
  }
  toggleReqeustBtn(){
    this.reqFalg=!this.reqFalg;
  }
  request()
  {
    this.btnEnable=false;
    this.requestService.AddRequest(this.req).subscribe(
      data => {
        //window.location.reload();
        this.toggleReqeustBtn();
        this.btnEnable=true;
      }
   );
  }

}
