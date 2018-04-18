import { Component, OnInit } from '@angular/core';
import { Addbook } from '../Shared/addbook';
import { ActivatedRoute, Router } from '@angular/router';
import { BookaddService } from '../Service/bookadd.service';

@Component({
  selector: 'app-deletebook',
  templateUrl: './deletebook.component.html',
  styleUrls: ['./deletebook.component.css']
})
export class DeletebookComponent implements OnInit {
  book:Addbook;
  id:number;
  saved:boolean = false;
  constructor(private  _router:Router,private prodSer:BookaddService,private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id=this._activatedRoute.snapshot.params["id"];
   
    this.getbook();
  }
  getbook()
  {
    this.prodSer.GetBookById(this.id).subscribe(data=>{this.book=data;});
    
  
   
  
  }
  deleteprod(){
    this.saved=true;
    this.prodSer.deleteBook(this.id).subscribe(data=>{
      this._router.navigate(['/MyAds/']);
    });
  }

}
