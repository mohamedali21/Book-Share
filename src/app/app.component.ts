import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(){
   
  }
  userIsLogged():boolean{
    var userT=localStorage.getItem("userToken");
    //console.log(userT);
    if(userT==null)
    {
      return false;
    }else
    {
      return true;
    }
  }
}
