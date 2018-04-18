import { Component, OnInit } from '@angular/core';
import {AdsService} from '../../Service/ads.service'
import { Observable } from 'rxjs'
import { Book } from '../../Shared/book';
import { Router} from '@angular/router'

// ///////////////////////////////////////////////
import { LocationService } from '../../Service/location.service';
import {CategoryService } from '../../Service/category.service';
 //import { LocationService} from '../../service/location.service'

import { Category } from '../../Shared/category';
 import { Location } from '../../Shared/location';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  IsLoaded:boolean;
  constructor(private adsService:AdsService,private _router:Router, private locationService:LocationService, private catService:CategoryService) { 
    this.IsLoaded=false;
  }
  ads: Book[];

   cats: Category[];
   govs: Location[];
   governate: Location;
  searchName:string ="";
  
  catSearchId: number = 1;
  govSearchId: number = 1;
  //CitySearchId: number = 1;
  CitySearchName: string = "";
  isCatChanged: boolean = false;
  isGovChanged: boolean = false;
  isGovEquallAllGovernate: boolean = true;
  isCityChanged: boolean = false;
  withLocation: boolean = false;
  searchIndicator: number ;


  ngOnInit() {
    //this.adsService.getProductFromAPI().subscribe(data=>{this.ads=data});
    this.getBooks();
    this.getAllCategory();
    this.getGovs();
    this.getGovsById(1);
  }
  details(id)
  {
    this._router.navigate(['/details/'+id ]);
  }


  ///////////////////////////////////
  getBooks(){
    this.adsService.getProductFromAPI().subscribe(data=>{this.ads=data;this.IsLoaded=true});
    this.isGovChanged = false;
    this.isCityChanged = false;
    this.isGovEquallAllGovernate = true;
    this.getGovs();
  }
  getGovs(){
    this.locationService.getAllGovs().subscribe(data => {this.govs = data});
  }

  getGovsById(id:number){
    this.locationService.getGovsById(id).subscribe(data=>{ this.governate = data });
  }

  getAllCategory(){
    this.catService.getAllCAts().subscribe(data => {this.cats = data;});
  }

  getBookPerGovernate(id: number){
    this.adsService.searchByGovernate(id).subscribe(data => {this.ads = data});
  }

  searchByCity(name:string){
    this.adsService.searchByCity(name).subscribe(data=>{ this.ads = data });
  }

  //   called on change the category selected item of dropdownlist 
  change(id){
    //this.locationService.getGovsById(id).subscribe(data=>{ this.governate = data });
    this.isCatChanged = true;
    this.catSearchId = id;
    if(id == 0){
      this.getBooks();
      this.isGovChanged = false;
      this.isCityChanged = false;
      this.isGovEquallAllGovernate = true;
      this.getGovs();
    }
    else{
      this.adsService.searchByCategory(id).subscribe(data => {this.ads = data});

      ///////////////////////////////////////////////////
      this.isGovChanged = false;
      this.isCityChanged = false;
      this.isGovEquallAllGovernate = true;
      this.getGovs();

      ///////////////////////////////////////////////////
    }
  }
  //  called on change governate dropdownlist
  changeGovernate(id){
    this.govSearchId = id;
    this.isGovChanged = true;
    if(id == 0){
      this.getBooks();
      this.isGovEquallAllGovernate = true;
    }
    else{
      this.getGovsById(id);
      //this.getBookPerGovernate(id);
      this.isGovEquallAllGovernate = false;
      this.getByGovernateAndCategoryNoBookName();
    }
  }

  //  on change city dropdown list 
  changeCity(name:string){
    //this.CitySearchName = name;
    this.isCityChanged =true;
    this.CitySearchName = name;
    console.log(name);
    this.searchByCity(name);
  }

  searchBook(bookname: string){
    if(bookname != ""){
     //console.log("appear only on not empty book name search text fields ay kalam tany mosh mohem abadan");
     
     //  nothing changed
     //  serchaby by name only
     //  get book from all category and gov and city
     if(this.isCatChanged == false && this.isGovChanged == false && this.isCityChanged == false){
       this.searchIndicator = 0;  
     }
     //  only the category changed
     //  serchaby by name and category
     //  get book from all gov and city
     if(this.isCatChanged && this.isGovChanged == false && this.isCityChanged == false){
       this.searchIndicator = 1;
     }
     //  category and governate changed
     //  serchaby by name and category and governate
     //  get book from all city within specific governate
     else if(this.isCatChanged && this.isGovChanged  && this.isCityChanged == false){
       this.searchIndicator = 11;
     }
     //  category, governate and city changed
     //  serchaby by name and category and governate and city
     //  get book from specific gategory within specific governate and specific city
     else if(this.isCatChanged && this.isGovChanged  && this.isCityChanged ){
       this.searchIndicator = 111;
     }

     //  only the governate changed
     //  serchaby by name and governate
     //  get book from all category
     if(this.isCatChanged == false && this.isGovChanged  && this.isCityChanged == false){
       this.searchIndicator = 2;
     }
     //  governate and city changed
     //  serchaby by name , governate and city
     //  get book from all gategory within specific governate and specific city
     else if(this.isCatChanged == false  && this.isGovChanged  && this.isCityChanged ){
       this.searchIndicator = 22;
     }
     //  category and city changed
     //  serchaby by name , category and city
     //  get book from speciic gategory within specific governate and specific city
     else if(this.isCatChanged && this.isGovChanged == false  && this.isCityChanged ){
       this.searchIndicator = 33;
     }
     //  onlly city changed
     //  serchaby by name , city
     //  get book from all gategory within specific governate and specific city
     else if(this.isCatChanged == false&& this.isGovChanged == false && this.isCityChanged ){
       this.searchIndicator = 4;
     }
     console.log(this.searchIndicator);
     switch (this.searchIndicator) {
       case 0:
         this.getByNameOnly(this.searchName);
         break;
       case 1:
        this.getByNameAndCategory(this.searchName, this.catSearchId);
         break;
       case 11:
          this.getByGovernateAndCategory(this.searchName, this.govSearchId ,this.catSearchId);
         break;
         case 111:
          this.getByGovernateCityAndCategory(this.searchName, this.CitySearchName, this.catSearchId);
         break;
         case 33:
          this.getByGovernateCityAndCategory(this.searchName, this.CitySearchName, this.catSearchId);
         break;
         case 4:
          this.getByNameAndCityName(this.searchName, this.CitySearchName);
         break;
         case 2:
          this.getByNameAndGovernate(this.searchName, this.govSearchId);
         break;
       default:
         // code...
         break;
     }

    }  //  end switch case
  }  //end function 

  
  showdata(){
    console.log("select books");
    console.log("is cat Changed  :   "+ this.isCatChanged+  "   category ID :  "+ this.catSearchId);
    console.log("is gov Changed  :   "+ this.isGovChanged +"    gov Id :        "+  this.govSearchId);
    console.log("is all category :   "+ this.isGovEquallAllGovernate);
    console.log("is city Changed :   "+ this.isCityChanged + "   city Id :      "+ this.CitySearchName);

  }

  getByNameOnly(bookname:string){
    this.adsService.searchByName(bookname).subscribe(data => {this.ads = data});
  }

  getByNameAndCategory(bookName:string, catId:number){
    this.adsService.searchByNameAndCategory(bookName, catId).subscribe(data=>{this.ads = data});
    //console.log(bookName+ "----" + catId);
  } 

  getByGovernateAndCategory(bookName:string, govId:number, catId:number){
    // console.log(bookName + "--"+ govId + "--" + catId);
    this.adsService.searchByCollection(bookName, govId, catId).subscribe(data => {this.ads = data});
  }

  getByGovernateCityAndCategory(bookName:string, cityname:string, catId:number){
    //console.log(bookName +  "--" + catId+ "--"+ cityname);
    this.adsService.searchByNameAndCategoryAndCity(bookName, cityname, catId).subscribe(data => {this.ads = data});
  }

  getByNameAndCityName(bookName: string, cityName:string){
    console.log(bookName +  "--" + cityName)
  }

  getByNameAndGovernate(bookName:string, govId:number){
    this.adsService.getByNameAndGovernateId(bookName, govId).subscribe(data=> { this.ads = data});
  }

  ///////////////////////////////////
  ///  5-4-2018  
  
  getByGovernateAndCategoryNoBookName(){
    this.adsService.searchByGovAndCat(this.govSearchId, this.catSearchId).subscribe(data => {this.ads = data});
  }

  getByGovernateIdOnly(){
    this.adsService.searchByGovernate(this.govSearchId).subscribe(data => {this.ads = data});
  }
} 
