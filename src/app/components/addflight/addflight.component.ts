import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adminflight } from 'src/app/models/adminflight';
import { Airport } from 'src/app/models/airport';
import { AdminflightcrudService } from 'src/app/services/adminflightcrud.service';
import { AirportsService } from 'src/app/services/airports.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit {
  addflight:Adminflight;
  flights;
  flightcheck=true;
  v:Adminflight;
  isLoggedIn: boolean;
  airports:Airport[] =[];

  constructor(private service:AdminflightcrudService, private airportservice : AirportsService, private router: Router) { }

  ngOnInit(): void {
    this.addflight={
      flight_name:'',
      departure_time:null,
      arrival_time:null,
      economic_fare:null,
      business_fare:null,
      source_airport_id:null,
      destination_airport_id:null
    }
    this.airportservice.getAirports().subscribe((data)=>{this.airports=data});
    this.flightcheck=true;
    this.service.getAll().subscribe((data: Adminflight[])=>{
      this.flights = data;
  }) 
  if(!sessionStorage.getItem('admin'))
    {
      Swal.fire({
        title: 'Oops!',
        text: 'Login to Continue!',
        icon: 'warning',
       
      })
      this.router.navigate([`${'/adminlogin'}`]);
    }
    if(sessionStorage.getItem('admin'))
    {
        this.isLoggedIn = true
    }
  }
 
  onclickfn()
  {
    this.flightcheck=true;
  }
  
  
  
 
  submitForm(AddFlightForm) {
    
  for(let i=0;i<this.flights.length;i++)
  {
    if(this.flights[i].flight_name==AddFlightForm.value.flight_name)
      {
        this.flightcheck=false;
        window.scrollTo(0,1);
      }
  }

  console.log(this.flightcheck);
    
    if(this.flightcheck==true)
    {
      Swal.fire('Adding Flight');    Swal.showLoading();
      this.service.addflight(AddFlightForm.value).subscribe((data)=>
      console.log(data,"Flight Added")
      )
      Swal.close();
    this.router.navigate([`${'viewallflights'}`]);
    }
   
   }
   
}
