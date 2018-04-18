
export class BookDetails {
    BookID:number;
    UserID:number;
    User_Name:string;
    Name:string;
    Points:number;
    Date_Uploaded:Date;
    Discription:string;
    SubCategory:string;
    CityName : string;
    Images:string[];
    constructor(bookID?:number,userID?:number,user_Name?:string,subCategory?:string,discription?:string,name?:string,points?:number,date_Uploaded?:Date,img_Url?:string,images?:string[]){
        this.BookID=bookID;
        this.UserID=userID;
        this.Name=name;
        this.Points=points;
        this.Date_Uploaded=date_Uploaded;
        this.Images=images;
        this.Discription=discription;  
        this.User_Name=user_Name;                              
        this.SubCategory=subCategory;
    }
}
