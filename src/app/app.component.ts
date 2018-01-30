import { Component, OnInit} from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/Http";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cartstat = false
  cart
  constructor(private rou:Router,private ht:Http){}
  name :string;
  id
  loginstat=sessionStorage.getItem("login")
  cartmodal = sessionStorage.getItem("cartmodal")
  ngOnInit(){
    this.name = localStorage.getItem("profile_name")
    if(this.loginstat=="loginnow!"){
      sessionStorage.removeItem("login")
      this.loginmod()
    }
    this.ht.get("http://localhost:3000/products/cart/"+localStorage.getItem("profile_id"))
    .subscribe(
      result=>{
          if(result.json().length>0){
            this.cartstat=true
            this.cart=result.json()
            console.log(this.cart)
          }
      })
    
  }

  logintoggle(){
    $(function () {
      $('#login').modal('toggle');
   });
  }

  signuptoggle(){
    $(function () {
      $('#signup').modal('toggle');
   });
  }
  loginmod(){
    $(document).ready(function(){
          $("#login").modal();
      });
  }
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("profile_name")
    localStorage.removeItem("profile_id")
    this.name = undefined;
    this.rou.navigate([""])
    this.setrel()
  }
  signupmod(){
    $(document).ready(function(){
      $("#signup").modal();
  });
  }
  checkmyprofile(){
    this.rou.navigate(["profile"])
    
  }
  search(yey:NgForm){
    this.rou.navigate(["list"],{queryParams: {Search:yey.value.search}})
    location.reload();
  }
  login(fu:NgForm){
    console.log(fu.value.ushh)
    console.log(fu.value.pass)
    let user ={
      Username: fu.value.ushh,
      Password: fu.value.pass,
    }

    let options= new RequestOptions({headers: new Headers({"Content-Type":"application/json"})})

    this.ht.post("http://localhost:3000/users/login",user,options).subscribe(
      result =>{

        console.log(result.json());
        localStorage.setItem("token",result.json().token)
        localStorage.setItem("profile_id",result.json().profile.id)
        localStorage.setItem("profile_name",result.json().profile.name)

        this.name = localStorage.getItem("profile_name")
        this.rou.navigate(["profile"])
        fu.reset()
        this.logintoggle()
        this.reload() 


      },
      error =>{
        console.log(error)
      })
  }
  signup(fu:NgForm){
    console.log(fu.value.username);
    console.log(fu.value.pass);
    console.log(fu.value.mail);
    if( fu.value.username !== "" && fu.value.username !== null ){

      
      let user = new FormData();
      user.append("Username", fu.value.username);
      user.append("Password", fu.value.pass);
      user.append("Email",fu.value.mail);


    let options= new RequestOptions({headers: new Headers()})

    this.ht.post("http://localhost:3000/users/addnew",user,options).subscribe(
      result =>{
        console.log(result.json().Email);
        fu.reset()
        this.signuptoggle()

        this.ht.post("http://localhost:3000/users/login",user,options).subscribe(
          result =>{
    
            console.log(result.json());
            localStorage.setItem("token",result.json().token)
            localStorage.setItem("profile_id",result.json().profile.id)
            localStorage.setItem("profile_name",result.json().profile.name)
    
            this.name = localStorage.getItem("profile_name")
            this.rou.navigate(["profile"])
    
    
          },
          error =>{
            console.log(error)
          })
        
      },
      error =>{
        console.log(error)
      }
    )}

  }
  tocart(){
    this.rou.navigate(["/cart"])
  }
  reload(){
    location.reload();
  }
  setrel(){
    localStorage.setItem("rel","false")
    
  }
  navbar(){
  //   $(document).ready(function(){       
  //     var scroll_start = 0;
  //     var startchange = $('#startchange');
  //     var offset = startchange.offset();
  //      if (startchange.length){
  //     $(document).scroll(function() { 
  //        scroll_start = $(this).scrollTop();
  //        if(scroll_start > offset.top) {
  //            $(".navbar-default").css("background","rgba(0, 0, 0, 0.7)","!important");
  //            $(".navbar-default").css("color","white","!important");
  //         } else {
  //            $('.navbar-default').css("background","rgba(0, 0, 0, 0.253)","!important");
  //         }
  //     });
  //      }
  //  });
  }
}
