import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  profile(){
    if(this.authService.loggedIn()){
      this.router.navigate(['/profile']);
    }
    
  }

  home(){
    if(this.authService.loggedIn()){
      this.router.navigate(['/']);
    }
  }

}
