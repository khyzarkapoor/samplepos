import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../services/order.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  orderlist:any=[];
  constructor(private orderService:OrderService, private router:Router) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(data=>{
      if(data.success){
        this.orderlist = data.data;        
      }else{
        alert(data.error);
      }
    })
  }

}
