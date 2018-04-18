import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { RequestService } from '../Service/request.service';
import { BookReq } from '../Shared/bookReq';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../Service/chat.service';
import { ChatMsgs } from '../Shared/ChatMsgs';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  userRequests:BookReq[];
  UserReq:BookReq;
  Confirmed:boolean;
  book_Id:number;
  sendComplaint:boolean;
  OpIsDone:boolean;
  OpIsPending:boolean;
  OPConfirm:boolean;
  //make this flag because delay in api //don't apear any thing until retreive from Api
  boolFlag:boolean;
  message:string;
  userID:number;
  msgs:ChatMsgs[];
  msg:ChatMsgs;
  constructor(private _router:Router,private chatService:ChatService,private requestService:RequestService,private _activatedRoute:ActivatedRoute) { 
    this.sendComplaint=false;
    this.boolFlag=true;
    this.msg=new ChatMsgs();
  }
  Interval:any;
  chatInterval:any;
  chatmsg:string;
  ngOnInit() {
    this.book_Id=this._activatedRoute.snapshot.params["id"];
    this.userID=Number(localStorage.getItem('userID'));
    console.log("OPConfirm:"+ this.OPConfirm);
    this.Interval = setInterval(() => {
    this.requestService.AcceptedRequests(this.book_Id).subscribe(
      data=>{
        this.UserReq=data;
        if(data==null)
        {
          this.Confirmed=false;
          this.requestService.UserRequests(this.userID,this.book_Id).subscribe(data=>{this.userRequests=data;
            this.boolFlag=false});
          console.log(this.Confirmed);
        }else{
          if (this.Interval) {
            clearInterval(this.Interval);
          }
          this.Confirmed=true;
          console.log(this.Confirmed);
          this.Interval=setInterval(() => {this.requestService.OperationCheck(this.book_Id).subscribe(data=>{
            if(data==null)
            {
              this.OPConfirm=false;
              this.OpIsDone=false;
              this.OpIsPending=false;
            }
            else if(data=="SellerConfirm"){
              this.OPConfirm=true;
              this.OpIsPending=true;
              this.OpIsDone=false;
            }else if(data=="Conirmed"){
              this.OPConfirm=true;
              this.OpIsPending=false;
              this.OpIsDone=true;
              clearInterval(this.Interval);
              console.log("Interval Is Clear");  
            }
            this.chatService.AllMsgs(this.userID,this.book_Id,this.UserReq.Requester_Id).subscribe(data=>{this.msgs=data;});
            this.chatInterval = setInterval(() => {
              this.chatService.AllMsgs(this.userID,this.book_Id,this.UserReq.Requester_Id).subscribe(data=>{this.msgs=data;});}, 5000);
            this.boolFlag=false;
          });}, 5000);  
          
        }
        }
    );}, 6000);
  }
  Confirm(req){
    console.log(req);
    this.requestService.AcceptRequest(req).subscribe(data=>{
      this.requestService.AcceptedRequests(this.book_Id).subscribe(data=>this.UserReq=data);
      this.boolFlag=false; 
    });
    this.Confirmed=true;

  }
  CofirmOP(){
    if(window.confirm('Are sure you want to Confirm that operation is done ?')){
        this.requestService.OperationConfirm(this.book_Id,localStorage.getItem('userID')).subscribe(data=>{
        if(data!=null)
        {
          this.requestService.OperationCheck(this.book_Id).subscribe(data=>{
            if(data==null)
            {
              this.OPConfirm=false;
              this.OpIsDone=false;
              this.OpIsPending=false;
            }
            else if(data=="SellerConfirm"){
              this.OPConfirm=true;
              this.OpIsPending=true;
              this.OpIsDone=false;
            }else if(data=="Conirmed"){
              this.OPConfirm=true;
              this.OpIsPending=false;
              this.OpIsDone=true;
            }
            this.boolFlag=false;
          });
        }

              
      });
    }
  }
  sendmsg()
  {
    console.log(this.book_Id);    
    this.msg.Book_Id=this.book_Id;
    this.msg.Sender_Id=this.userID;
    this.msg.Receiver_Id=this.UserReq.Requester_Id;
    this.msg.Message1=this.chatmsg;
    console.log(this.msg);
    if(this.chatmsg!=null)
    {
      if (this.Interval) {
        clearInterval(this.Interval);
      }
      this.chatService.AddMsh(this.msg).subscribe(data=>{
        this.chatService.AllMsgs(this.userID,this.book_Id,this.UserReq.Requester_Id).subscribe(data=>{this.msgs=data});  
        this.chatmsg==null
      });
    }
  }
  
  CancelReq(){
    this.requestService.CancelRequest(this.UserReq).subscribe(data=>{
      this.requestService.UserRequests(this.userID,this.book_Id).subscribe(data=>{this.userRequests=data;
        this._router.navigate(['/MyAds']);
        console.log("MyAds is Inside");
      });
    });  
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
