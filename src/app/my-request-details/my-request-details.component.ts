import { Component, OnInit } from '@angular/core';
import { RequestService } from '../Service/request.service';
import { ActivatedRoute } from '@angular/router';
import { BookReq } from '../Shared/bookReq';
import { Review } from '../Shared/Review';
import { ReviewService } from '../Service/review.service';
import { ChatMsgs } from '../Shared/ChatMsgs';
import { ChatService } from '../Service/chat.service';

@Component({
  selector: 'app-my-request-details',
  templateUrl: './my-request-details.component.html',
  styleUrls: ['./my-request-details.component.css']
})
export class MyRequestDetailsComponent implements OnInit {
  book_Id:number;
  userID:number;
  Confirmed:boolean;
  sendComplaint:boolean;
  OpIsDone:boolean;
  OPIsDoneByOther:boolean;
  OPConfirm:boolean;
  boolFlag:boolean;
  reviewFlag:boolean;
  UserReq:BookReq;
  Interval:any;
  review:Review;
  msgs:ChatMsgs[];
  msg:ChatMsgs;
  chatInterval:any;
  chatmsg:string;
  constructor(private chatService:ChatService,private requestService:RequestService,private reviewService:ReviewService,private _activatedRoute:ActivatedRoute) { 
    this.sendComplaint=false;
    this.boolFlag=true;
    this.review=new Review();
    this.msg=new ChatMsgs();
  }

  ngOnInit() {
    this.book_Id=this._activatedRoute.snapshot.params["id"];
    this.userID=Number(localStorage.getItem('userID'));
    this.Interval = setInterval(() => {
    this.requestService.AcceptedRequests(this.book_Id).subscribe(
      data=>{
        
        if(data==null)
        {
          this.requestService.UserRequest(this.userID,this.book_Id).subscribe(data=>{this.UserReq=data;
            this.chatMethod();
            this.boolFlag=false; });          
          this.Confirmed=false;
          console.log("request not confirmed");          
        }else{
          // stop outer interval
          if (this.Interval) {
            clearInterval(this.Interval);
          }
          if(data.Requester_Id==this.userID)
          {
            this.Confirmed=true;
            this.reviewService.UserReview(this.userID,this.book_Id).subscribe(data=>{
              if(data==null)
              {
                this.reviewFlag=false;
                console.log("data is null");
              }
              else{
                this.reviewFlag=true;
                this.review=data;
                this.rate=data.Rate;
                this.userReview=data.Review;
                console.log("Rate: "+data.Rate);
              }
            });
            this.Interval=setInterval(() => {
            this.requestService.OperationCheck(this.book_Id).subscribe(data=>{
              if(data==null)
              {
                this.OPConfirm=false;
                this.OpIsDone=false;
                console.log(this.Confirmed);
                console.log("Operation not confirmed");  
              }
              else if(data=="BuyerConfirm"){
                if (this.chatInterval) {
                  clearInterval(this.chatInterval);
                }
                this.OPConfirm=true;
                this.OpIsDone=false;
                console.log("ClearInterval");
                clearInterval(this.Interval);
                clearInterval(this.chatInterval);                
                console.log("BuyerConfirm");  
              }else if(data=="Conirmed"){
                if (this.chatInterval) {
                  clearInterval(this.chatInterval);
                }
                this.OPConfirm=true;
                this.OpIsDone=true;
                clearInterval(this.Interval);
                console.log("ClearInterval");                
                console.log("Operation Is Done");  
              }
              
              this.requestService.UserRequest(this.userID,this.book_Id).subscribe(data=>{this.UserReq=data;
                this.chatMethod();
                this.boolFlag=false;
               });
            });}, 5000);
            console.log("confirmed");
          }  
          else{
            this.OPIsDoneByOther=true;
            this.requestService.UserRequest(this.userID,this.book_Id).subscribe(data=>{this.UserReq=data;
              this.chatMethod();
              this.boolFlag=false;
              console.log("ClearInterval");
              clearInterval(this.Interval);
            });
            console.log("Confirm With other User");        
          }
        }
        
      });}, 5000);
  }
  chatMethod(){
    this.chatService.AllMsgs(this.userID,this.book_Id,this.UserReq.Seller_Id).subscribe(data=>{this.msgs=data;});
        this.chatInterval = setInterval(() => {
          this.chatService.AllMsgs(this.userID,this.book_Id,this.UserReq.Seller_Id).subscribe(data=>{this.msgs=data;console.log("Chat");});
        }, 5000);
  }
  CofirmOP(){
    if(window.confirm('Are sure you want to Confirm that operation is done ?')){
        this.requestService.OperationConfirm(this.book_Id,localStorage.getItem('userID')).subscribe(data=>{
        if(data!=null)
        {
          this.OPConfirm=true;
          this.OpIsDone=false;
          if (this.chatInterval) {
            clearInterval(this.chatInterval);
          }
        }
              
      });
    }
  }
  
  rate:number;
  userReview:string;
  
  reviewSubmit(){
    this.review.Book_Id=this.book_Id;
    this.review.Buyer_Id=this.userID;
    this.review.Seller_Id=this.UserReq.Seller_Id;
    this.review.Rate=this.rate;
    this.review.Review=this.userReview;
    console.log(this.review);
    console.log(this.rate+" "+this.userReview);
    this.reviewService.AddReview(this.review).subscribe(
      data=>{ this.reviewFlag=true;console.log("review Flag: "+this.reviewFlag); console.log("Confirm Flag: "+this.OPConfirm); }
    );
    
  }
  sendmsg()
  {
    console.log(this.book_Id);
    console.log("Recieved id: "+this.UserReq.Requester_Id);           
    this.msg.Book_Id=this.book_Id;
    this.msg.Sender_Id=this.userID;
    this.msg.Receiver_Id=this.UserReq.Seller_Id
    this.msg.Message1=this.chatmsg;
    console.log(this.msg);
    if(this.chatmsg!=null)
    {
      this.chatService.AddMsh(this.msg).subscribe(data=>{
        this.chatService.AllMsgs(this.userID,this.book_Id,this.UserReq.Seller_Id).subscribe(data=>{this.msgs=data});  
        this.chatmsg=="";
      });
    }
  }
  ngOnDestroy() {
    if (this.Interval) {
      clearInterval(this.Interval);
    }
    if (this.chatInterval) {
      clearInterval(this.chatInterval);
    }
  }
}


