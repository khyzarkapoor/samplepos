import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css']
})
export class NeworderComponent implements OnInit {

  foodactive:boolean=false;
  othersactive:boolean=false;
  totalbill:number=0;

  constructor(private productService:ProductService,private orderService:OrderService,private router:Router) { }

  menuitems:any = [];
  contentitems:any = [];
  addeditems:any=[];

  ngOnInit() {
    this.getAllFood();
    this.totalbill=0;
  }

  getAllFood(){
    this.contentitems = [];
    this.menuitems = [];
    this.foodactive=true;
    this.othersactive=false;
    this.productService.getAllProductsByCategory("food").subscribe(data=>{
      if(data.success){
        this.contentitems = data.data;

        this.contentitems.forEach(element => {
          element.newquantity = element.quantity;
        });
      }else{
        alert(data.error);
        return false;
      }
    })
  }

  getAllOthers(){
    this.contentitems = [];
    this.menuitems = [];
    this.foodactive=false;
    this.othersactive=true;
    this.productService.getAllProductsByCategory("other").subscribe(data=>{
      if(data.success){
        this.contentitems = data.data;
        this.contentitems.forEach(element => {
          element.newquantity = element.quantity;
        });
      }else{
        alert(data.error);
        return false;
      }
    })
  }

  addquantity(id){    
    this.addeditems.forEach(element => {
      if(element._id === id){        
        element.quantity += 1;
        return;
      }
    });
    this.calculateTotal();
  }

  subquantity(id){
    this.addeditems.forEach(element => {
      if(element._id === id){
        element.quantity -= 1;
        if(element.quantity==0){
          this.addeditems = this.addeditems.filter(function(el){
            return el.quantity!=0;
          });
        }
        return;
      }
    });
    this.calculateTotal();
  }

  addToTable(item){
    const found = this.addeditems.some(el=>el._id === item._id);
    if(!found){
      item.quantity = 1;      
      this.addeditems.push(item);
    }else{
      this.addquantity(item._id);
    }
    this.calculateTotal();
  }

  deleteproduct(id){
    this.addeditems = this.addeditems.filter(function(item){
      return item._id!=id;
    })
    this.calculateTotal();
  }

  calculateTotal(){
    let bill = 0;
    this.addeditems.forEach(element => {
      bill += (element.baseprice * element.quantity);
    });
    this.totalbill = bill;
  }

  checkout(){
    if(this.addeditems.length > 0){

      const orderdetails = [];
      this.addeditems.forEach(element => {
        orderdetails.push(
          {
            productid:element._id,
            quantity:element.quantity,
            price:element.baseprice
          }
        )
      });

      const order = {
        orderdetails:JSON.stringify(orderdetails),
        orderamount:this.totalbill
      }

      this.orderService.newOrder(JSON.stringify(order)).subscribe(data=>{
        if(data.success){
          alert(data.msg);
          this.addeditems=[];
          this.contentitems=[];
          this.totalbill=0;
          this.getAllFood();
        }else{
          alert(data.error+"\n"+JSON.stringify(data.errordetails));
          return;
        }
      })
    }else{
      alert("There are no items in the cart.");
    }
  }

}
