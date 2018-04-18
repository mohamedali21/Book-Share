import { Injectable } from '@angular/core';
import { Category } from '../shared/category';
import { Subcategory1212 } from '../shared/subcategory1212';
import { Subcategory11 } from '../Shared/subcategory11';
import { Http ,Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class CategoryService {

  constructor(private http:Http) { }

  getAllCAts(){
  	let cats: Observable<Category[]>;
     //console.log("In service");
     cats=this.http.get('http://localhost:40362/api/category/list').map(b=>{console.log(b.json()); return  <Category[]> b.json();});
    return cats;
  }

  addCategroy(cat:Category){
  	let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(cat);
    return this.http.post('http://localhost:40362/api/Category', body, options ).map((res: Response) => res.json());
    
  }

  getCatIDByName(catName:string){
  	let catId : Observable<number>;
  	catId=this.http.get('http://localhost:40362/api/categoryById/'+catName).map(b=>{console.log(b.json()); return  <number> b.json();});
    return catId;
  }

  addSubCategory(subcat:Subcategory11){
  	let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(subcat);
    return this.http.post('http://localhost:40362/api/category/addSub', body, options ).map((res: Response) => res.json());
  }

}
