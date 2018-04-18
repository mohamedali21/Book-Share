export class Categories {
    Id:number;
    Name:string;
    SubCategoryName:string[];
    constructor(Id?:number,name?:string,sub?:string[]){
        this.Id=Id;
        this.Name=name;
        this.SubCategoryName = sub;
    }
}
