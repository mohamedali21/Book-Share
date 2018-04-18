import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/user';
import { Book } from '../Shared/book';
import { User2Service } from '../Service/user2.service';
import { AdsService } from '../Service/ads.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private _route:Router,private userService: User2Service, private adsService:AdsService ) { }
  showApproved : boolean = false;
  allUser:boolean  =false;
  approvedBook:boolean  =false;
  pendingBook:boolean  =false;
  adminUser:boolean = false;
  users: User[];
  books: Book[];


  ngOnInit() {
  	//this.getUsers();
  }

  select(value:string){
  	
  	switch (value) {
  		case "allUser":
  			this.allUser = true;
  			this.approvedBook =false;
  			this.pendingBook =false;
  			this.adminUser =false;
        this.getUsers();
  			break;
  		case "approvedBook":
  			this.allUser = false;
  			this.approvedBook =true;
  			this.pendingBook =false;
  			this.adminUser =false;
        this.getapprovedBook();
  			break;
  		case "pendingBook":
  			this.allUser = false;
  			this.approvedBook =false;
  			this.pendingBook =true;
  			this.adminUser =false;
        this.getPendingBook();
  			break;
  		case "adminUser":
  			this.allUser = false;
  			this.approvedBook =false;
  			this.pendingBook =false;
  			this.adminUser =true;
        this.getAdmins();
  			break;
  		default:
  			// code...
  			break;
  	}
  }

  getUsers(){
  	this.userService.getNormalUser().subscribe(data => {this.users = data});
  }
  getAdmins(){
    this.userService.getAdminUser().subscribe(data => {this.users = data});
  }
  getapprovedBook(){
    this.adsService.getProductFromAPI().subscribe(data => {this.books =data});
  }
  getPendingBook(){
    this.adsService.getPendingBooks().subscribe(data => {this.books = data});
  }

  setAdmin(id:number){
    this.userService.setAsAdmin(id).subscribe(data =>{ this.getUsers()});
  }

  setUser(id:number){
    this.userService.removeFromAdmin(id).subscribe(data =>{ this.getAdmins()});
  }
  AcceptBook(id:number){
    console.log(id);
    this.adsService.approveBook(id).subscribe(data => { this.getPendingBook()});
  }
  RemoveBook(id:number){
    this.adsService.deApproveBook(id).subscribe(data => { this.getapprovedBook()});
  }

  suspend(id){
    this.userService.makeActive(id).subscribe(data =>{ this.getUsers()});
  }
  makeActive(id){
    this.userService.makeActive(id).subscribe(data =>{ this.getUsers()});
  }
  bookDetails(bookId){
    this._route.navigate(['/details/'+bookId]);
  }
}
