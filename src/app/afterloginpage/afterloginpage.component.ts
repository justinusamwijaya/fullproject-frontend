import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute} from "@angular/router";
import{Http,RequestOptions,Headers}from"@angular/Http";
import { error } from 'util';

declare var $:any;


@Component({
  selector: 'app-afterloginpage',
  templateUrl: './afterloginpage.component.html',
  styleUrls: ['./afterloginpage.component.css']
})
export class AfterloginpageComponent implements OnInit {
  productsUploaded;
  checklength = 0;
  name = localStorage.getItem("profile_name")
  id = localStorage.getItem("profile_id")

  constructor(private roo:Router, private ht:Http, private aktiv:ActivatedRoute) { }

  ngOnInit() {
    $(function() {
      $('html').scrollTop(0);
   });
   const token = localStorage.getItem("token")
    console.log(token)
    if(!token){
      this.roo.navigate(["/"])
      localStorage.removeItem("token");
      localStorage.removeItem("profile_name")
      localStorage.removeItem("profile_id")
      location.reload()
    }
    else {
      let header =new RequestOptions({headers : new Headers({"Authorization":"Bearer " + token})})
      this.ht.post("http://localhost:3000/api/validate",{},header)
      .subscribe(
        result =>{
          console.log(localStorage.getItem("profile_name"))

          
          this.ht.get("http://localhost:3000/products/profile/"+this.id)
          .subscribe(
            result=>{
       
              this.productsUploaded=result.json()
              this.checklength = this.productsUploaded.length
              console.log(this.productsUploaded)
              
            },
            error =>{
              console.log(error)
            })
           
        },
        error =>{
          localStorage.removeItem("token");
          localStorage.removeItem("profile_name")
          localStorage.removeItem("profile_id")
          location.reload()
          this.roo.navigate(["/"])

        })
      }
    
    

  }
  delete(x){
    this.ht.delete("http://localhost:3000/products/delete/"+x)
    .subscribe(
      result=>{},
      error=>{
        console.log(error)
      }
    )
    location.reload()
  }
  toAddProduct(){
    this.roo.navigate(["new"])
  }
  toListProduct(){
    this.roo.navigate(["list"])
  }
}
