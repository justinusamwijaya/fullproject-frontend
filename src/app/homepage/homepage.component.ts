import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Http,Headers,RequestOptions} from "@angular/Http";

declare var $ :any;


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  unitList: any[];
  rel = localStorage.getItem("rel")
  constructor(private ey:Router, private ht:Http) { }

  ngOnInit() {
    $(function() {
      $('html').scrollTop(0);
   });
   if(this.rel=="false"){
    localStorage.removeItem("rel")
    this.reload()
   }
    $(document).ready(function(){
      $('.owl-carousel1').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        navContainer: '#customNav1',
        responsive:{
            0:{
                items:1,
                nav:true
            },
            // 600:{
            //     items:3,
            //     nav:false
            // },
            1000:{
                items:3,
                nav:true,
                loop:false
            }
        },
        navText : ['<i class="fa fa-chevron-left" style="cursor:pointer;position:absolute;top:50%;right:97%;"><span class="glyphicon glyphicon-chevron-left"></span></i>','<i class="fa fa-chevron-right" style="cursor:pointer;position:absolute;top:50%;left:97%;"><span class="glyphicon glyphicon-chevron-right"></span></i>']
        
    });
    $('.owl-carousel2').owlCarousel({
      loop:true,
      margin:10,
      responsiveClass:true,
      navContainer: '#customNav2',
      responsive:{
          0:{
              items:1,
              nav:true
          },
          // 600:{
          //     items:3,
          //     nav:false
          // },
          1000:{
              items:3,
              nav:true,
              loop:false
          }
      },
      navText : ['<i class="fa fa-chevron-left" style="cursor:pointer;position:absolute;top:50%;right:97%;"><span class="glyphicon glyphicon-chevron-left"></span></i>','<i class="fa fa-chevron-right" style="cursor:pointer;position:absolute;top:50%;left:97%;"><span class="glyphicon glyphicon-chevron-right"></span></i>']
      
  })
    // $( ".owl-prev").html('<i class="fa fa-chevron-left" style="position:relative;float:left;"><span class="glyphicon glyphicon-chevron-left"></span></i>');
    // $( ".owl-next").html('<i class="fa fa-chevron-right" style="position:relative;float:right;"><span class="glyphicon glyphicon-chevron-right"></span></i>');
    });
    
    
  
    this.ht.get("http://localhost:3000/products/list")
    .subscribe(
      result=>{
        this.unitList=result.json()
        console.log(this.unitList)
      },
      error=>{
        console.log(error)
      }
    )
  
  }
  todetail(x){
    this.ey.navigate(["list/"+x])
  }

  setrel(){
    localStorage.setItem("rel","false")
  }

  reload(){
    location.reload();
  }
  
}
