import { Data } from "@angular/router/src/config";

export class BookReq{
    Seller_Id:number;
	Requester_Id: number;
    Book_Id:number;
    BookName:string;
    ReqDate:Date;
    RequesterName:String;
    SellerName:string;
    BookImgUrl:string;
    Message:string;
    Points:number;
    Offer_Points:number;
}