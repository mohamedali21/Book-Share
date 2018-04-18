import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-un-auth-header',
  templateUrl: './un-auth-header.component.html',
  styleUrls: ['./un-auth-header.component.css']
})
export class UnAuthHeaderComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute, private _router:Router) { }

  ngOnInit() {
  }
  login(){
  	this._router.navigate(['/Login/']);
  }
  Register(){
  	this._router.navigate(['/Register/']);
  }
}
