import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ChatMsgs } from '../Shared/ChatMsgs';

@Injectable()
export class ChatService {

  constructor(private http:Http) { }
  AddMsh(msg){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(msg);
    return this.http.post('http://localhost:40362/api/Chat', body, options ).map((res: Response) => res.json());
  }
  AllMsgs(senderID,bookID,receivedID):Observable<ChatMsgs[]>
  {
     let msgs: Observable<ChatMsgs[]>;
     console.log('http://localhost:40362/api/Chat/'+senderID+"/"+bookID+"/"+receivedID);
     msgs=this.http.get('http://localhost:40362/api/Chat/'+senderID+"/"+bookID+"/"+receivedID).map(ads=>{
        return  <ChatMsgs[]> ads.json();});
     return msgs;
  }
}
