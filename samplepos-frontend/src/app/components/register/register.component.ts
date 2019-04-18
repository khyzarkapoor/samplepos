import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String = "";
  phone: String = "";
  email: String = "";
  password: String = "";
  showspinner:boolean = false;

  constructor(private validateService: ValidateService, private authService:AuthService, private router:Router) { }
// if already logged in then redirect to options page
  ngOnInit() {
    if(this.authService.loggedIn()){
      this.router.navigate(['/options']);
    }
  }

  register() {
    this.showspinner = true;
    const user = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password
    };

    // check if all the fields are there
    if (!this.validateService.validateRegister(user)) {
      alert("Please input all fields.");
      this.showspinner = false;
      return false;
    }

    // check if email is valid
    if (!this.validateService.validateEmail(user.email)) {
      alert("Please provide a valid email.");
      this.showspinner = false;
      return false;
    }

    if(!this.validateService.validateNumericValues(user.phone)){
      alert("Please provide a valid phone.");
      this.showspinner = false;
      return false;
    }

    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        alert(data.msg + "\nYou can now login.");
        // navigate to the login path
        this.router.navigate(['/'])
      }else{
        alert(data.error);
        this.router.navigate(['/register'])
      }
      this.showspinner=false;
    })

  }


}
