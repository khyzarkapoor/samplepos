import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OptionComponent } from './components/option/option.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { NewproductComponent } from './components/newproduct/newproduct.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { NeworderComponent } from './components/neworder/neworder.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { OrderService } from './services/order.service';

import { AuthGuard } from "./guards/auth.guard";
import { OrderlistComponent } from './components/orderlist/orderlist.component';

const appRoutes : Routes = [
  {path:'', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'options',component:OptionComponent, canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'products',component:ProductlistComponent, canActivate:[AuthGuard]},
  {path:'products/new',component:NewproductComponent, canActivate:[AuthGuard]},
  {path:'products/edit',component:EditproductComponent, canActivate:[AuthGuard]},
  {path:'orders/new',component:NeworderComponent, canActivate:[AuthGuard]},
  {path:'orders/all',component:OrderlistComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo:''}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    OptionComponent,
    ProfileComponent,
    ProductlistComponent,
    NewproductComponent,
    EditproductComponent,
    NeworderComponent,
    OrderlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService,AuthService,ProductService,OrderService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
