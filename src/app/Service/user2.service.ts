import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Http ,Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class User2Service {

  constructor(private http:Http) { }

  
  getNormalUser():Observable<User[]>
  {
    let users: Observable<User[]>;
    users=this.http.get('http://localhost:40362/api/user/list/norm').map(u=>{ return  <User[]> u.json() });
    return users;
  }
  getAdminUser():Observable<User[]>
  {
    let users: Observable<User[]>;
    users=this.http.get('http://localhost:40362/api/user/list/admin').map(u=>{ return  <User[]> u.json() });
    return users;
  }
  UserAciviesCount(userID) {
    
    let userAciviesCount: Observable<any>;
    userAciviesCount=this.http.get('http://localhost:40362/api/user/ActivtiesCount/'+userID).map(ads=>{console.log(ads.json()); return  <any> ads.json();});
   return userAciviesCount;
  }
  setAsAdmin(id:number){
    let user: Observable<User>;
    user=this.http.get('http://localhost:40362/api/user/RoleChange/'+id).map(u=>{ return  <User> u.json() });
    return user;
  }
  removeFromAdmin(id:number){
    let user: Observable<User>;
    user=this.http.get('http://localhost:40362/api/user/RoleChange/'+id).map(u=>{ return  <User> u.json() });
    return user;
  }

  makeActive(id:number){
    let user: Observable<User>;
    user=this.http.get('http://localhost:40362/api/user/activate/'+id).map(u=>{ return  <User> u.json() });
    return user;
  }
  makeInActive(id:number){
    let user: Observable<User>;
    user=this.http.get('http://localhost:40362/api/user/activate/'+id).map(u=>{ return  <User> u.json() });
    return user;
  }

}
