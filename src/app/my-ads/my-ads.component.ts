import { Component, OnInit } from '@angular/core';
import{ AdsService} from '../Service/ads.service'
import { Book } from '../shared/book';
import { Router} from '@angular/router';
import { RequestService } from '../Service/request.service';
@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {
  userAds:Book[];
  constructor(private adsService:AdsService,private requestService:RequestService,private  _router:Router) { }

  ngOnInit() {
    this.adsService.getUserAds(localStorage.getItem('userID')).subscribe(data=>{this.userAds=data;
      this.HandleDescriptionLength(this.userAds);
    });
  }
  requests(id){
    this._router.navigate(['/Requests/'+id]);
  }
  edit(id)
  {
    console.log(id);
    this._router.navigate(['/Editbook/'+id ]);

  }
  delete(id)
  {
    console.log(id);
    this._router.navigate(['/Deletebook/'+id ]);
  }
  showDetails(bookId){
    this._router.navigate(['/details/'+bookId]);
  }
  HandleDescriptionLength(list:Book[])
  {
    for (let item of list)
    {
      if(item.Description.length>150)
      {
        item.Description=item.Description.slice(0,150)+" ....";
      }
    }
  }
}
