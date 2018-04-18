import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { Subcategory1212 } from '../Shared/subcategory1212'
import { Category22 } from '../Shared/category22';
import { CategoryService } from '../Service/category.service'
import { Route } from '@angular/router'
import { Subcategory11 } from '../Shared/subcategory11'

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {

  constructor(private catService: CategoryService, private router:Router) { }
  subcat:Subcategory11;
  cats : Category22[];
  catId:number =0;
  selectedCategory:boolean = false;
  ngOnInit() {
  	this.subcat = new Subcategory11();
  	this.getcats();
  }

  getcats(){
  	this.catService.getAllCAts().subscribe(data => {this.cats = data});
  }
  AddSubCat(subcat:Subcategory11){
  	console.log("this is add sub function");
  	console.log("sub name is : "+ subcat.SubCatName);
  	console.log("sub name is : "+ subcat.SubDiscription);
  	subcat.catID = this.catId;
  	this.catService.addSubCategory(subcat).subscribe(data => { this.goHome()});
  }

  change(id){
  	this.catId = id;
  	console.log("selected id is "+this.catId);
    this.selectedCategory = true;
  }


  goHome(){
  	this.router.navigate['/Admin/'];
  }

}
