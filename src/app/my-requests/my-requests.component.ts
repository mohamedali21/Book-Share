import { Component, OnInit } from '@angular/core';
import { BookReq } from '../Shared/bookReq';
import { RequestService } from '../Service/request.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {
  id:any;
  num:number;
  userRequests:BookReq[];
  constructor(private requestService:RequestService,private _router:Router) { 
    this.num=1;
  }

  ngOnInit() {
    this.requestService.MyRequests(localStorage.getItem('userID')).subscribe(data=>{this.userRequests=data;});
    this.id = setInterval(() => {
      this.num++;
      console.log(this.num);
      if(this.num==5)
      {
        clearInterval(this.id);
      }
    }, 5000);
  }
  reqDetails(bookId){
    console.log(this.userRequests)
    this._router.navigate(['/MyRequests/'+bookId]);
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
