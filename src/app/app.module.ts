import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/Http";


import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AfterloginpageComponent } from './afterloginpage/afterloginpage.component';
import { EditModeComponent } from './edit-mode/edit-mode.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NewproductComponent,
    ListproductComponent,
    ProductdetailComponent,
    AfterloginpageComponent,
    EditModeComponent,
    CartComponent,

  ],
  imports: [
    BrowserModule,RouterModule.forRoot([
      {path:"",component:HomepageComponent},
      {path:"new",component:NewproductComponent},
      {path:"list",component:ListproductComponent},
      {path:"list/:id",component:ProductdetailComponent},
      {path:"profile",component:AfterloginpageComponent},
      {path:"edit/:id",component:EditModeComponent},
      {path:"cart",component:CartComponent},

    ]),
    FormsModule,
    HttpModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
