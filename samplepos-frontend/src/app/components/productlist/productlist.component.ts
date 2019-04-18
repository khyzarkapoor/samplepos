import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  showspinner:boolean =false;
  productlist:any=[];
  constructor(private productService:ProductService, private router:Router,private authService:AuthService) { }

  ngOnInit() {
    this.showspinner = true;
    this.productService.getAllProducts().subscribe(data=>{
      if(data.success){
        this.productlist = data.data;
      }else{
        alert(data.error);
      }
      this.showspinner = false;
    })
  }

  editproduct(id){
    // console.log(id);
    this.router.navigate(['/products/edit'],{queryParams:{productid:id}});
  }

}
