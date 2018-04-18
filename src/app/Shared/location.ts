export class Location {
	Id:number;
	Name:string;
	Cities:string[];
	constructor(id?:number, name?:string, cities?:string[]){
		this.Id = id;
		this.Name = name;
		this.Cities = cities;
	}
}
