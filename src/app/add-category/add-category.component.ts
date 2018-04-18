import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router} from '@angular/router';
import { CategoryService } from '../Service/category.service'
import { Category22 } from '../Shared/category22'



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private catService: CategoryService, private _router:Router) { }
  cat :Category22; 
  catId:number;
  cats: Category22[];
  respons:string;

  showCats : boolean = false;
  addCategory:boolean  =false;
  

  ngOnInit() {
  	this.cat = new Category22();
  }
  async AddCat(c:Category22){
  	console.log("add categroy functiodn");
  	await this.catService.addCategroy(c).subscribe(data =>{this.respons = data.cat});
    //console.log(await this.catService.addCategroy(c).subscribe(data =>{ this.respons = data}));
    console.log(this.respons);
  	
    this.goAdminDash();
    //
    //
    
    
  }
  goAdminDash(){
    this._router.navigate(['/addSubCat/']);
  } 

  // AddSubCategory(cat:Category12, subcat:Subcategory12){
  	
  //   this.catService.addSubCategory(subcat).subscribe(data =>{this.goAdminDash()});
  //   console.log(cat.Id);
  //   console.log(cat.Name);
  // }

  getCategoryId(catName:string){
    console.log("get category by name function");
  	this.catService.getCatIDByName(catName).subscribe(data => {this.catId =data});
  	console.log("category id is :  "+this.catId);

  }

  select(value:string){
    switch (value) {
      case "showCats":
        this.showCats = true;
        this.addCategory =false;
        this.getCats();
        break;
      case "addCategory":
        this.showCats = false;
        this.addCategory =true;
        break;
      
      default:
        // code...
        break;
    }
  }


  getCats(){
    this.catService.getAllCAts().subscribe(data => {this.cats =data});
  }

  
}