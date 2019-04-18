import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { ProductService } from "../../services/product.service";
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  name:String="";
  category:String="";
  baseprice:Number=0;
  quantity:Number=0;
  showspinner:boolean=false;

  constructor(private route:ActivatedRoute, private productService:ProductService, private router:Router, private validateService:ValidateService) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    this.showspinner = true;
    this.productService.getUnitProduct(this.route.snapshot.queryParams['productid']).subscribe(data=>{
      if(data.success){
        this.name = data.data.name;
        this.category = data.data.category;
        this.baseprice = data.data.baseprice;
        this.quantity = data.data.quantity;
      }else{
        alert(data.getheaders());
        this.router.navigate(['/products']);
        return false;
      }
      this.showspinner = false;
    });
  }

  update(){
    this.showspinner = true;
    const product = {
      id:this.route.snapshot.queryParams['productid'],
      name:this.name,
      category:this.category,
      baseprice:this.baseprice,
      quantity:this.quantity
    }

    if(!this.validateService.validateProduct(product)){
      alert("Please provide all required fields.");
      this.showspinner =false;
      return false;
    }

    if(!this.validateService.validateNumericValues(product.baseprice)){
      alert("Please provide valid values for numeric fields");
      this.showspinner=false;
      return false;
    }

    if(!this.validateService.validateNumericValues(product.quantity)){
      alert("Please provide valid values for numeric fields");
      this.showspinner = false;
      return false;
    }

    this.productService.updateUnitProduct(product).subscribe(data=>{
      if(data.success){
        alert("Product Updated.")
        this.getProduct();
      }else{
        alert(data.error);
        return false;
      }
      this.showspinner = false;
    });
    
  }

  deleteProduct(){
    this.showspinner = true;
    this.productService.deleteUnitProduct(this.route.snapshot.queryParams['productid']).subscribe(data=>{
      if(data.success){
        alert("Product was deleted.")
        this.router.navigate(['/products']);
      }else{
        alert(data.error);
        return false;
      }
      this.showspinner = false;

    })
  }

}
