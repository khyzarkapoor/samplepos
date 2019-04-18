import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { ProductService } from "../../services/product.service";
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {

  name:String="";
  category:String="";
  baseprice:Number=0;
  quantity:Number=0;
  showspinner:boolean= false;

  constructor(private route:ActivatedRoute, private productService:ProductService, private router:Router, private validateService:ValidateService) { }

  ngOnInit() {
  }

  addproduct(){
    this.showspinner = true;
    let product = {
      name:this.name,
      category:this.category,
      baseprice:this.baseprice,
      quantity:this.quantity
    }

    if(!this.validateService.validateNewProduct(product)){
      alert("Please provide all required fields.");
      this.showspinner =false;
      return false;
    }

    if(!this.validateService.validateNumericValues(product.baseprice)){
      alert("Please provide valid values for numeric fields");
      this.showspinner = false;
      return false;
    }

    if(!this.validateService.validateNumericValues(product.quantity)){
      alert("Please provide valid values for numeric fields");
      this.showspinner = false;
      return false;
    }

    this.productService.addUnitProduct(product).subscribe(data=>{
      if(data.success){
        alert("New Product Added.")
        this.router.navigate(['/products']);
      }else{
        alert(data.error);
        return false;
      }
      this.showspinner = false;
    })
  }

}
