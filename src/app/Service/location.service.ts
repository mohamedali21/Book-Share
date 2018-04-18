import { Injectable } from '@angular/core';
import { Location } from '../shared/location';
import { Http ,Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

  constructor(private http:Http) { }

  getAllGovs(){
  	let govs: Observable<Location[]>;
     //console.log("In service");
     govs=this.http.get('http://localhost:40362/api/governate/list').map(b=>{console.log(b.json()); return  <Location[]> b.json();});
    return govs;
  }

  getGovsById(id:number):Observable<Location>
  {
    let gov: Observable<Location>;
    gov=this.http.get('http://localhost:40362/api/governate/byId/'+id).map(g=>{ return  <Location> g.json() });
    return gov;
  }

}
