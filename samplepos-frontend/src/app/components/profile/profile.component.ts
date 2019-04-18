import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:Object
  showspinner:boolean=false;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.showspinner=true;
    this.authService.profile().subscribe(data=>{
      if(data.success){
        this.user = data;
      }
      this.showspinner = false;
    },
    err=>{
      this.showspinner=false;
      alert(err);
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    });
  }

}
