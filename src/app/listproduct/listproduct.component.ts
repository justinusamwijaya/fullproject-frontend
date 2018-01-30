import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/Http";
import{Router,ActivatedRoute} from "@angular/router";

declare var $:any

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  unitList : any[]
  search = null
  searchstat :boolean;
  constructor(private ht:Http, private roo:Router, private activ:ActivatedRoute) { }

  ngOnInit() {
    $(function() {
      $('html').scrollTop(0);
   });


  this.activ
   .queryParams
   .subscribe(params => {
    this.search = params.Search
   });
   console.log(this.search)
   if(this.search == null){
   this.ht.get("http://localhost:3000/products/list")
   .subscribe(
     result=>{
       this.searchstat=false
       this.unitList=result.json()

     },
     error=>{
       console.log(error)
     })
    }else{
      this.ht.get("http://localhost:3000/products/"+this.search)
      .subscribe(
        result=>{
          this.searchstat = true
          this.unitList=result.json()
          this.search=null
          console.log(this.unitList)
        },
        error=>{
          console.log(error)
        }
      )
    }
  }
  refresh(){
    this.roo.navigate(["list"])
    location.reload();
  }

}
