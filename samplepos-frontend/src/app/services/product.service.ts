import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  // baseIP:String="http://localhost:3000/";
  baseIP:String="";

  constructor(private http:Http) { }
  
    getAllProducts(){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem("token"));
      return this.http.get(this.baseIP + "api/products/all",{headers:headers})
      .map(res => res.json());
    }

    getAllProductsByCategory(category){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem("token"));
      return this.http.get(this.baseIP + "api/products/all/category/"+category,{headers:headers})
      .map(res => res.json());
    }

    getUnitProduct(id){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem("token"));
      return this.http.get(this.baseIP + "api/products/unit/"+id,{headers:headers})
      .map(res => res.json());
    }

    updateUnitProduct(product){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem("token"));
      return this.http.put(this.baseIP + "api/products/edit",product,{headers:headers})
      .map(res => res.json());
    }

    deleteUnitProduct(id){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem("token"));
      return this.http.delete(this.baseIP + "api/products/remove/"+id,{headers:headers})
      .map(res => res.json());
    }

    addUnitProduct(product){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Authorization',localStorage.getItem("token"));
      return this.http.post(this.baseIP + "api/products/add",product,{headers:headers})
      .map(res => res.json());
    }
  
}
