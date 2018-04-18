import { Component, OnInit } from '@angular/core';
import { Addbook } from '../Shared/addbook';
import { Category } from '../shared/category';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { NgZone } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BookaddService } from '../Service/bookadd.service';




declare var google: any;

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  public latitude =30.040566430584597;
  public longitude =31.234130859375 ;
  public latitude1 =30.040566430584597;
  public longitude1=31.234130859375  ;
  h1:boolean = true;
  h2:boolean = true;
  h3:boolean = true;
  h4:boolean = true;
  zoom = 5;

  required:boolean= true;
   
  book:Addbook;
  cat : Category[];
  subCat : Category;
  id:number;
  img1:string;
  img2:string;
  img3:string;
  img4:string;
 
  public searchElementRef: ElementRef;
  constructor(private prodSer:BookaddService,private changeDetectorRef: ChangeDetectorRef,private _route:Router,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private _activatedRoute:ActivatedRoute) {
    this.book=new Addbook();
  
   }
  
   ngOnInit() {
    this.id=this._activatedRoute.snapshot.params["id"];
    this.getbook();
    this.getCategory();
    this.change("Horror");
    this.subscribeCurrentPosition();
    
    
  }

getbook()
{
  this.prodSer.GetBookById(this.id).subscribe(data=>{this.book=data;});

 

}

imgrequired1()
{
this.required = !this.required ;
}
  hide1()
  {this.h1 = !this.h1; 
    
  }
  hide2()
  {this.h2 = !this.h2;}
  hide3()
  {this.h3 = !this.h3;}
  hide4()
  {this.h4 = !this.h4;}
   
  click(event)
  {
   this.latitude1 = event.coords.lat;
   this.longitude1 = event.coords.lng;
   this.zoom=11;
   
    console.log(event);
    console.log(this.latitude);console.log(this.longitude);
    this.getaddress(event.coords.lat,event.coords.lng);
    
  }
  
  subscribeCurrentPosition() {
     {
      window.navigator.geolocation.watchPosition(
        (position) => {
          this.latitude=position.coords.latitude;
          this.longitude=position.coords.longitude;
          
         // this.userService.sendCurrentPosition(this.myLocation, this.supplierId);  //send position to backend
          setTimeout(() => this.subscribeCurrentPosition(), 3000);
        }, (error) => {
          console.log('Geolocation error: '+ error);
        });
      } 
      }
      subscribeCurrentPosition1(){ this.getaddress(this.latitude,this.longitude);
        this.zoom=13;
      this.latitude1=this.latitude;
      this.longitude1=this.longitude;

      }
  

  
  getaddress(lat , lon){
    console.log("boo"); 
    console.log(lat);
    console.log(lon);
   
    let myLatlng = new google.maps.LatLng(lat,lon);
    let geocoder = new google.maps.Geocoder();
    var self = this;
     geocoder.geocode({'latLng': myLatlng}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
       if (results[0]) {
       var addr = results[0].formatted_address;
      
       
       let splitted = addr.split(",", 10); 
       
      
     self.book.Governate=splitted[3];
     self.book.City=splitted[2];
     self.govchick();
       }
       }
       });
      
       }
       govchick()
       {console.log(this.book.Governate);
         if(this.book.Governate==" Egypt")
         {
           this.book.Governate = this.book.City;
           console.log(this.book.Governate);

         }


       }
     
     
       



   getCategory(){
    this.prodSer.getCategoryFromAPI().subscribe(data=>{this.cat=data});
    
}
change1(id){
  
  console.log(this.book.UserId);
 this.book.SubCatogry = id;
}
   change(name){
     
  	this.getSubCat(name);
  }

  getSubCat(id:string){
  	  	this.prodSer.getCategoryByIdAPI(id).subscribe(data=>{this.subCat=data});

  }
  reset(){
    this.book=new Addbook();
  }
  
  insertprod(){
    this.prodSer.EditBook(this.book).subscribe(data=>{this.saved=true;
      console.log("Edit");
      this._route.navigate(['/details/'+data.BookId ]);
    });
  }
  
  submitted = false;
  saved=false;
  onSubmit(){
    this.book.UserId = Number(localStorage.getItem('userID'));
    this.book.BookId=this.id;
    this.submitted = true;
    
  }
   



emptyimg1(){this.img1 = null;this.book.Img[0]=null;}
emptyimg2(){this.img2 = null;this.book.Img[1]=null;}
emptyimg3(){this.img3 = null;this.book.Img[2]=null;}
emptyimg4(){this.img4 = null;this.book.Img[3]=null;}

 img()
 {
  
 
//this.book.Img=[this.img1,this.img2,this.img3,this.img4];



 }




  fileChange1(input,index=0){
    let reader = new FileReader();
    
    if(index in input.files){
      
     this.readFile1(input.files[index], reader);
      }
    
    }
   
    
   readFile1 (file, reader){
    reader.onload = () => {
    this.book.Img[0]=reader.result;
    
    
   }
   reader.readAsDataURL(file);
  }

  fileChange2(input,index=0){
    let reader = new FileReader();
    
    if(index in input.files){
      
     this.readFile2(input.files[index], reader);
      }
    
    }
   
    
   readFile2 (file, reader){
    reader.onload = () => {
    this.book.Img[1]=reader.result;
    
    
   }
   reader.readAsDataURL(file);
  }


  fileChange3(input,index=0){
    let reader = new FileReader();
    
    if(index in input.files){
      
     this.readFile3(input.files[index], reader);
      }
    
    }
   
    
   readFile3 (file, reader){
    reader.onload = () => {
    this.book.Img[2]=reader.result;
    
    
   }
   reader.readAsDataURL(file);
  }

    
  fileChange4(input,index=0){
    let reader = new FileReader();
    
    if(index in input.files){
      
     this.readFile4(input.files[index], reader);
      }
    
    }
   
    
   readFile4 (file, reader){
    reader.onload = () => {
    this.book.Img[3]=reader.result;
    
    
   }
   reader.readAsDataURL(file);
  }

 
  



   
}

