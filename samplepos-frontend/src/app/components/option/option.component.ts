import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/']);
    }
  }

}
