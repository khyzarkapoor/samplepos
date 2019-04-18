import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  // baseIP: String = "http://localhost:3000/";
  baseIP:String="";

  constructor(private http: Http) { }

  newOrder(order) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',localStorage.getItem("token"));
    return this.http.post(this.baseIP + "api/orders/add", order, { headers: headers })
      .map(res => res.json());
  }

  getAllOrders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',localStorage.getItem("token"));
    return this.http.get(this.baseIP + "api/orders/all", { headers: headers })
      .map(res => res.json());    
  }

}
