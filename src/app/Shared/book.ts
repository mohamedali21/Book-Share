export class Book {
    BookID:number;
    UserID:number;
    Name:string;
    Points:number;
    Description:string;
    CityId: number;
    CityName : string;
    Date_Uploaded:Date;
    Subcategory_Id: number;
    SubCatName:string;
    Img_Url:string;
    Requests:number;
    constructor(bookID?:number,userID?:number,name?:string,points?:number,date_Uploaded?:Date, subCatName?:string, description?:string,img_Url?:string){
        this.BookID=bookID;
        this.UserID=userID;
        this.Name=name;
        this.Points=points;
        this.Description=description;        
        this.Date_Uploaded=date_Uploaded;
        this.SubCatName = subCatName;
        this.Img_Url=img_Url;
    }
}
