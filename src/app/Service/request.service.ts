import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { BookReq } from '../Shared/bookReq';
@Injectable()
export class RequestService {

  constructor(private http:Http) { }
  
  AddRequest(req){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(req);
    return this.http.post('http://localhost:40362/api/Request', body, options ).map((res: Response) => res.json());
  }
  Check(req){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(req);
    return this.http.post('http://localhost:40362/api/Request/check', body, options ).map((res: Response) => res.json().IsExist);
  }
  UserRequests(userID,bookID):Observable<BookReq[]>
  {
     let userReqs: Observable<BookReq[]>;
    
     userReqs=this.http.get('http://localhost:40362/api/User/Requests/'+userID+"/"+bookID).map(ads=>{console.log(ads.json()); return  <BookReq[]> ads.json();});
    return userReqs;
  }
  MyRequests(userID):Observable<BookReq[]>
  {
     let userReqs: Observable<BookReq[]>;
     userReqs=this.http.get('http://localhost:40362/api/MyRequests/'+userID).map(ads=>{console.log(ads.json()); return  <BookReq[]> ads.json();});
    return userReqs;
  }
  AcceptedRequests(bookID):Observable<BookReq>
  {
     let userReqs: Observable<BookReq>;
     userReqs=this.http.get('http://localhost:40362/api/Accepted/Request/'+bookID).map(ads=>{console.log(ads.json()); return  <BookReq> ads.json();});
    return userReqs;
  }
  AcceptRequest(req){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(req);
    return this.http.post('http://localhost:40362/api/Request/Accept', body, options ).map((res: Response) => res.json());
  }
  
  CancelRequest(req){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(req);
    return this.http.post('http://localhost:40362/api/Request/Cancel', body, options ).map((res: Response) => res.json());
  }
  deleteRequest(bookID,requesterID) {
    return this.http.delete('http://localhost:40362/api/Request/delete/' +bookID+"/"+requesterID);
  }


  OperationConfirm(bookID,userID):Observable<string>
  {
    let OpCfrm: Observable<string>;
    OpCfrm=this.http.get('http://localhost:40362/api/Operation/Confirm/'+bookID+"/"+userID).map(ads=>{console.log(ads.json()); return  <string> ads.json();});
    return OpCfrm;
  }
  OperationCheck(bookID):Observable<string>
  {
    let OP: Observable<string>;
    OP=this.http.get('http://localhost:40362/api/Operation/Check/'+bookID).map(ads=>{console.log(ads.json()); return  <string> ads.json();});
    return OP;
  }
  UserRequest(userID,bookID):Observable<BookReq>
  {
    let userReqs: Observable<BookReq>;
    userReqs=this.http.get('http://localhost:40362/api/User/Request/'+userID+"/"+bookID).map(ads=>{console.log(ads.json()); return  <BookReq> ads.json();});
    return userReqs;
  }

}
