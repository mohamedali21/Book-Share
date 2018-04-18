import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Http ,Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  userAuthinticate(username:string, userpass:string){
  	//console.log("user service");
  	//var data = "username=user&password=user&grant_type=password";
  	var data = "username="+username+"&password="+userpass+"&grant_type=password";
  	var reqHeader = new Headers({'Content-Type':'application/x-www-urlencoded'});
  	return this.http.post('http://localhost:40362/token',data, { headers : reqHeader}).map((res: Response) => res.json());
  }



  testToken(token:string){
  	var sendtoken = 'bearer '+token;
  	//console.log("test token service : "+sendtoken);
  	var reqHeader = new Headers({'Content-Type':'application/x-www-urlencoded', 'Authorization' : sendtoken});
  	return this.http.get('http://localhost:40362/api/user/authintication', { headers : reqHeader}).map((res: Response) => res.json());

  }


  addUser(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:40362/api/user/register', body, options ).map((res: Response) => res.json());
  }

  
}
