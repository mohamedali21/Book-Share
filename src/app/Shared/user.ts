export class User {
	Id:number;
	UserName:string;
	Pass:string;
    Email:string;
    Role:string;
    IsActive:string;
    constructor(id?:number,uName?:string,pass?:string, email?:string,role?:string,isactive?:string){
        this.Id=id;
        this.UserName=uName;
        this.Pass=pass;
        this.Email=email;
        this.Role = role;
        this.IsActive = isactive;
    }
}
