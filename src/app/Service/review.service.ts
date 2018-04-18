import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Review } from '../Shared/Review';
@Injectable()
export class ReviewService {

  constructor(private http:Http) { }

  AddReview(rev){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(rev);
    return this.http.post('http://localhost:40362/api/Review', body, options ).map((res: Response) => res.json());
  }
  UserReview(buyerID,bookID):Observable<Review>
  {
    let userRev: Observable<Review>;
    userRev=this.http.get('http://localhost:40362/api/Review/'+buyerID+"/"+bookID).map(ads=>{console.log(ads.json()); return  <Review> ads.json();});
    return userRev;
  }
  UserReviews(userID):Observable<Review[]>
  {
     let userRevs: Observable<Review[]>;
     userRevs=this.http.get('http://localhost:40362/api/Reviews/'+userID).map(ads=>{return  <Review[]> ads.json();});
    return userRevs;
  }
}
