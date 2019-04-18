import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.phone == undefined || user.email == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateLogin(user){
    if(user.email == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateProduct(product){
    if(product.id == undefined || product.name == undefined || product.category == undefined || product.baseprice == undefined || product.quantity == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateNewProduct(product){
    if(product.name == undefined || product.category == undefined || product.baseprice == undefined || product.quantity == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateNumericValues(number){
    if(!Number.isNaN(number)){
      if(number>0){
        return true;  
      }else{
        return false;
      }
    }else{
      return false;
    }
    // return !Number.isNaN(number)
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
