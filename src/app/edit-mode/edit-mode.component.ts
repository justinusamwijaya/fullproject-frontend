import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/Http";
import {Router,ActivatedRoute} from "@angular/router";
import { NgForm } from '@angular/forms/src/directives/ng_form';

declare var $:any

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.css']
})
export class EditModeComponent implements OnInit {

  constructor(private ht:Http, private aktiv:ActivatedRoute, private roo:Router) { }
  objectz: any;
  params : any;
  profileid = localStorage.getItem("profile_id")

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

      this.getedititem()
         
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

  getedititem(){
        this.aktiv.params
    .subscribe(
      result=>{
        this.params = result["id"]
      })
    this.ht.get("http://localhost:3000/products/list/"+this.params)
    .subscribe(
      result=>{
        if(this.profileid!==result.json().UploaderId) this.roo.navigate([""]);
        console.log(result.json())
        this.objectz=result.json()
      },
      error =>{
        console.log(error)
      })
  }
  goedit(fu:NgForm){
    let form = new FormData()
    const option = new RequestOptions({headers: new Headers({})})
    form.append("NamaProduk",fu.value.namaproduk==null||fu.value.namaproduk==""? this.objectz.NamaProduk:fu.value.namaproduk)
    form.append("Deskripsi",fu.value.deskripsi==null||fu.value.deskripsi==""? this.objectz.Deskripsi:fu.value.deskripsi)
    form.append("Harga",fu.value.harga==null||fu.value.harga==""? this.objectz.Harga:fu.value.harga)
    console.log(fu.value.deskripsi)
    console.log(fu.value.harga)
    console.log(fu.value.namaproduk)

    this.ht.put("http://localhost:3000/products/update/"+this.params,form,option)
    .subscribe(
      result =>{
        this.roo.navigate(["profile"])
      },
      error =>{
        console.log(error)
      }
    )


  }
}
