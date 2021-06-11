import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = "http://localhost:8080/usuario";
  
  constructor(
    private http: HttpClient
    ) { 
      console.log("Element User form Service.");      
    }
  
  public postCreateUser (user: User): Observable<User>{
    const slash = "/create"
    return this.http.post<User>(this.url+slash, user);
  }

  public putUpdateUser(user: User): Observable<User>{
    const slash = "/edit"
    return this.http.put<User>(this.url+slash, user);
  }  
  public getListUsers () : Observable<Object>{
    const slash = "/all"
    return this.http.get(this.url+slash);
  }

  public getEmail(email: string):Observable<Object>{
    const slash = "/email/"+email;
    return this.http.get(this.url+slash);
  }
  public getCedula(cedula: number):Observable<Object>{
    const slash = "/cedula/"+cedula;    
    return this.http.get(this.url+slash);
  }



}

export class User {

  public id!: number;
  public name! : string;
  public lastName! : string;
  public cedula!: number;
  public email!: string;
  public phone!: number;


  constructor(){

  }

  setFields(name: string, lastName: string, cedula: number, email:string, phone: number) {    
    this.name = name;
    this.lastName = lastName;
    this.cedula = cedula;
    this.email = email;
    this.phone = phone;
  }
  
  setObject(user : User): void{
    this.name = user.getName();
    this.lastName = user.getLastName();
    this.cedula = user.getCedula();
    this.email = user.getEmail();
    this.phone = user.getPhone();
  }
  public getName(){
    return this.name;
  }
  public getLastName(){
    return this.lastName;
  }
  public getId(){
    return this.id;
  }
  public getCedula(){
    return this.cedula;
  }
  public getEmail(){
    return this.email;
  }
  public getPhone(){
    return this.phone;
  }
  

}
