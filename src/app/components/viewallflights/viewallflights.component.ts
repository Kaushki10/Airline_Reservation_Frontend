import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adminflight } from 'src/app/models/adminflight';
import { Airport } from 'src/app/models/airport';
import { AdminflightcrudService } from 'src/app/services/adminflightcrud.service';
import { AirportsService } from 'src/app/services/airports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewallflights',
  templateUrl: './viewallflights.component.html',
  styleUrls: ['./viewallflights.component.css']
})
export class ViewallflightsComponent implements OnInit {
  
  flights;
  searchText;
  airpots;
  isLoggedIn: boolean;
  constructor(private service:AdminflightcrudService,private as:AirportsService,private routers:Router,private route:ActivatedRoute) {
    
   }

  ngOnInit() {
    
    this.airpots=JSON.parse(this.route.snapshot.paramMap.get('airports'));
    this.service.getAll().subscribe((data)=>{
        this.flights = data;
        this.flights=this.flights.sort();
        this.flights.map(f=>{
        this.as.getAirports().subscribe(d=>{
          d.map(a=>{
          if(a.airport_id==f.source_airport_id){
            f.source_city=a.city;
          }
          if(a.airport_id==f.destination_airport_id){
           f.destination_city=a.city;
          }
        })
        });
      })
    })  
 
    if (!this.service.refreshcheck) {
      window.location.reload();
      this.service.refreshcheck=true
    } 
    if(!sessionStorage.getItem('admin'))
    {
      Swal.fire({
        title: 'Oops!',
        text: 'Login to Continue!',
        icon: 'warning',
       
      })
      this.routers.navigate([`${'/adminlogin'}`]);
    }
    if(sessionStorage.getItem('admin'))
    {
        this.isLoggedIn = true
    }
  
  }
  
 
}
