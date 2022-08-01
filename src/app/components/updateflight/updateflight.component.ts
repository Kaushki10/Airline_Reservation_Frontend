import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adminflight } from 'src/app/models/adminflight';
import { AdminflightcrudService } from 'src/app/services/adminflightcrud.service';
import { AirportsService } from 'src/app/services/airports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateflight',
  templateUrl: './updateflight.component.html',
  styleUrls: ['./updateflight.component.css']
})
export class UpdateflightComponent implements OnInit {
  public citydata;
  updateflight:Adminflight;
  isLoggedIn: boolean;
  constructor(private service:AdminflightcrudService,private router:ActivatedRoute,private airportservice : AirportsService, private routers: Router) { }

  ngOnInit(): void {
    this.service.getByflightname(this.router.snapshot.params['flightname']).subscribe((data)=>
    this.updateflight={
      flight_name:data["flight_name"],
      source_airport_id:data["source_airport_id"],
      destination_airport_id:data["destination_airport_id"],
      departure_time:data["departure_time"],
      arrival_time:data["arrival_time"],
      business_fare:data["business_fare"],
      economic_fare:data["economic_fare"]
      }
      
    )
    this.citydata = this.airportservice.getAirports().subscribe(d=>this.citydata=d);
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

 
  submitForm(UpdateFlightForm) {
    
  //   UpdateFlightForm.value.flight_name=this.updateflight.flight_name;
   
  //   Swal.fire('Updating Flight');    Swal.showLoading();
  //   this.service.updateflight(this.router.snapshot.params['flightnumber'],UpdateFlightForm.value).subscribe((data)=>
  //    console.log(data,"Flight Added")
  //  )
  //  Swal.close();
  //  this.routers.navigate([`${'ViewAllFlights'}`]);
  
  }
}
