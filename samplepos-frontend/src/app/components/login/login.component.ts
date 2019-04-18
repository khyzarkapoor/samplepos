import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String = "";
  password: String = "";

  constructor(private validateService: ValidateService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
    // if already logged in then redirect to options page
    if(this.authService.loggedIn()){
      this.router.navigate(['/options']);
    }
  }

  login() {
    const user = {
      email: this.email,
      password: this.password
    };

    // check if all the fields are there
    if (!this.validateService.validateLogin(user)) {
      alert("Please input all fields.")
      return false;
    }

    // check if email is valid
    if (!this.validateService.validateEmail(user.email)) {
      alert("Please provide a valid email.")
      return false;
    }

    this.authService.authenticate(user).subscribe(data=>{
      if(data.success){
        // clear the localstorage for any prior values
        localStorage.clear();
        // get the Auth token from rest api and save it in localstorage
        localStorage.setItem("token",data.token);
        this.router.navigate(['/options']);
      }else{
        alert(data.error);
        this.router.navigate(['/'])
      }
    })

  }


}
