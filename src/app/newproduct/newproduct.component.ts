import { Component, OnInit } from '@angular/core';
import {Http,RequestOptions,Headers} from "@angular/Http";
import {Router} from "@angular/router";
import{NgForm}from"@angular/forms";
declare var $:any

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {

  constructor(private roo:Router, private ht:Http) { }
gambar:File;
uploaderid = localStorage.getItem("profile_id")
uploadername = localStorage.getItem("profile_name")
  ngOnInit() {
    $(function() {
      $('html').scrollTop(0);
   });
   const token = localStorage.getItem("token")
   console.log(token)
   if(!token){
     this.roo.navigate(["/"])
   }
   else {
     let header =new RequestOptions({headers : new Headers({"Authorization":"Bearer " + token})})
     this.ht.post("http://localhost:3000/api/validate",{},header)
     .subscribe(
       result =>{
       },
       error =>{
         localStorage.removeItem("token");
         localStorage.removeItem("profile_name")
         localStorage.removeItem("profile_id")
         this.roo.navigate(["/"])
       })
     }
  }
  fileChange($event){
  
    this.gambar=$event.target.files[0];
     console.log(this.gambar);
     
 
   }
  AddProduct(wei:NgForm){

    let product = new FormData();
    let head = new RequestOptions({headers:new Headers({})})
    product.append("UploaderId",this.uploaderid)
    product.append("Uploadername",this.uploadername)
    product.append("NamaProduk",wei.value.NamaProduk)
    product.append("Deskripsi",wei.value.Deskripsi)
    product.append("Harga",wei.value.Harga)
    product.append("Gambar",this.gambar)
    this.ht.post("http://localhost:3000/products/addnew",product,head)
    .subscribe(
      result=>{
        console.log(result.json())
        this.roo.navigate(["profile"])
      },
      error=>{
        console.log(error)
      }
    )
  }
}
