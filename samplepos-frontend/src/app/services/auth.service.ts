import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt";

@Injectable()
export class AuthService {

  // baseIP:String="http://localhost:3000/";
  baseIP:String="";

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "api/users/register",user,{headers:headers})
    .map(res => res.json());
  }

  authenticate(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "api/users/authenticate",user,{headers:headers})
    .map(res => res.json());
  }

  profile(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',localStorage.getItem("token"));
    return this.http.get(this.baseIP + "api/users/profile",{headers:headers})
    .map(res => res.json());
  }

  loggedIn(){
    return tokenNotExpired('token');
  }


}
