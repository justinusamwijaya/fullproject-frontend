import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from"@angular/router";
import {Http,RequestOptions,Headers} from "@angular/Http";

declare var $:any

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  paramsid = null;
  objectz
  params
  name = localStorage.getItem("profile_id")
  uplodId
  cart=""
  mycart=localStorage.getItem(this.name+"'s cart")
  constructor(private ru:Router, private ht:Http, private aktiv:ActivatedRoute) { }


  ngOnInit() {
    $(function() {
      $('html').scrollTop(0);
   });
    this.aktiv.params
    .subscribe(
      result=>{
        this.params = result["id"]
      }
    )
    this.ht.get("http://localhost:3000/products/list/"+this.params)
    .subscribe(
      result=>{
        console.log(result.json())
        this.objectz=result.json()
        this.uplodId=result.json().UploaderId
      },
      error =>{
        console.log(error)
      }
    )
    
  }
  
  toeditpage(){
    this.ru.navigate(["/edit/"+this.objectz._id])
  }
  addtocart(){
    if(this.name==null){
      sessionStorage.setItem("login","loginnow!")
      location.reload()

    }else{
      let cart = new FormData()
      cart.append("ProductId",this.objectz._id)
      cart.append("UserId",localStorage.getItem("profile_id"))
      cart.append("Gambar",this.objectz.Gambar)
      cart.append("NamaProduk",this.objectz.NamaProduk)
      cart.append("Price",this.objectz.Harga)
      this.ht.post("http://localhost:3000/products/cart",cart)
      .subscribe(
        result=>{
          location.reload()
        },
      error=>{
        console.log(error)
      })
    }
  }
}
