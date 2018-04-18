import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { Addbook } from '../Shared/addbook';
import { Category } from '../shared/category';
import { Categories } from '../Shared/categories';

@Injectable()
export class BookaddService {

  constructor(private http:Http) { }

  AddBook(b:Addbook):Observable<Addbook>{
    let APIStatus="";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(b);
    console.log("service");
    
    return this.http.post('http://localhost:40362/api/AddBook', body, options ).map((res: Response) => res.json());
    
  }
  EditBook(b:Addbook):Observable<Addbook>{
    let APIStatus="";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(b);
    console.log("service");
    
    return this.http.put('http://localhost:40362/api/AddBook', body, options ).map((res: Response) => res.json());
    
  }

  deleteBook(b:number){
    
    return this.http.delete('http://localhost:40362/api/AddBook/'+b);
    
  }
  
  
   getCategoryFromAPI():Observable<Categories[]>
   {
     
     let cats: Observable<Categories[]>;
     cats=this.http.get('http://localhost:40362/api/categories/list').map(c=>{ return  <Categories[]> c.json()  });
     
     return cats;
   }
  
   getCategoryByIdAPI(id:string):Observable<Categories>
   {
     let cat: Observable<Categories>;
     //console.log(id);
     cat=this.http.get('http://localhost:40362/api/Category/'+id)
     .map(c=>{ return  <Categories> c.json() });
     
     return cat;
   }

   GetBookById(id:number):Observable<Addbook>
   {
     let bok: Observable<Addbook>;
     //console.log(id);
     bok=this.http.get('http://localhost:40362/api/AddBook/'+id)
     .map(c=>{ return  <Addbook> c.json() });
     console.log(bok);
     return bok;
   }
   
  
  }
  
