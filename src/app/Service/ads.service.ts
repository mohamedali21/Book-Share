import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Book } from '../shared/book';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { BookDetails } from '../Shared/book-details';
@Injectable()
export class AdsService {

  constructor(private http:Http) { }
  getProductFromAPI():Observable<Book[]>
  {
    
    let prodList: Observable<Book[]>;
    prodList=this.http.get('http://localhost:40362/api/Ads').map(prod=>{ return  <Book[]> prod.json() });
    return prodList;
  }
  getBook(id):Observable<BookDetails>
  {
    let book: Observable<BookDetails>;
    book=this.http.get('http://localhost:40362/api/Book/'+id).map(prod=>{ return  <BookDetails> prod.json() });
    return book;
  }
  getUserAds(userID):Observable<Book[]>
  {
     let userAds: Observable<Book[]>;
     console.log("In service");
     userAds=this.http.get('http://localhost:40362/api/GetUserAds/'+userID).map(ads=>{console.log(ads.json()); return  <Book[]> ads.json();});
    return userAds;
  }







    getAllBooks(){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/list').map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }

  searchByName(name: string){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/byName/'+name).map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }

  searchByCategory(catId: number){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/byCategory/'+catId).map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }

  searchByGovernate(govId: number){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/byGovernate/'+govId).map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }

  searchByCollection(bookNAme: string, govId: number, catId:number){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/byCollection/'+bookNAme+'/'+govId+'/'+catId).map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }

  searchByNameAndCategory(bookNAme: string, catId:number){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/byNameAndCategory/'+bookNAme+'/'+catId).map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }
  
  searchByNameAndCategoryAndCity(bookNAme: string, cityName:string, catId:number){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/byNameCatAndCity/'+ bookNAme + '/' +cityName + '/' + catId).map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }
  getByNameAndCityName(bookNAme: string, cityName:string){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/byNameCity/'+ bookNAme + '/' +cityName ).map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }

  getByNameAndGovernateId(bookNAme: string, govId:number){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/byNameandGovernate/'+ bookNAme + '/' +govId ).map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }
  searchByCity(cityName: string){
    let books: Observable<Book[]>;
     //console.log("In service");
     books=this.http.get('http://localhost:40362/api/book/byCity/'+cityName).map(b=>{console.log(b.json()); return  <Book[]> b.json();});
    return books;
  }

  getPendingBooks():Observable<Book[]>
  {
    let bookList: Observable<Book[]>;
    bookList=this.http.get('http://localhost:40362/api/book/pending').map(prod=>{ return  <Book[]> prod.json() });
    return bookList;
  }

  approveBook(id:number):Observable<Book>
  {
    let book: Observable<Book>;
    book=this.http.get('http://localhost:40362/api/book/Approved/'+id).map(prod=>{ return  <Book> prod.json() });
    return book;
  }

  deApproveBook(id:number):Observable<Book>
  {
    let book: Observable<Book>;
    book=this.http.get('http://localhost:40362/api/book/Approved/'+id).map(prod=>{ return  <Book> prod.json() });
    return book;
  }



  ////////////////////////
  ///////  5/4/2018
  searchByGovAndCat(govId:number, catId:number){
    let bookList: Observable<Book[]>;
    bookList=this.http.get('http://localhost:40362/api/book/GovCat/'+govId + '/'+ catId).map(prod=>{ return  <Book[]> prod.json() });
    return bookList; 
  }
  ///////////////////////////



}