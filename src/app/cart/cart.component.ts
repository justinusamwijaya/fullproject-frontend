import { Component, OnInit } from '@angular/core';
import {Http,RequestOptions,Headers}from "@angular/Http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart : any
  cartsum=0
  constructor(private ht:Http, private roo:Router) { }

  ngOnInit() {
    if(localStorage.getItem("profile_id")==null||localStorage.getItem("profile_id")==undefined){
      this.roo.navigate([""])
      location.reload()
      sessionStorage.setItem("login","loginnow!")
    }
    console.log(this.cart)
    this.ht.get("http://localhost:3000/products/cart/"+localStorage.getItem("profile_id"))
    .subscribe(
      result=>{
          if(result.json().length>0){
            this.cart=result.json()
            this.gosumit()
          }
      })

  }

removefromcart(x){
 this.ht.delete("http://localhost:3000/products/removefromcart/"+localStorage.getItem("profile_id")+"/"+x)
 .subscribe()
 location.reload()
}
checkout(){
  this.ht.delete("http://localhost:3000/products/checkout/"+localStorage.getItem("profile_id"))
  .subscribe()
  location.reload()
}
gosumit(){
  for(var i=0;i<this.cart.length;i++){
    this.cartsum+=parseInt(this.cart[i].Quantity)*parseInt(this.cart[i].Price)
  }
}
toListProduct(){
  this.roo.navigate(["/list"])
}
}
