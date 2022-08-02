import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adminflight } from 'src/app/models/adminflight';
import { AdminflightcrudService } from 'src/app/services/adminflightcrud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deleteflight',
  templateUrl: './deleteflight.component.html',
  styleUrls: ['./deleteflight.component.css']
})
export class DeleteflightComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private service:AdminflightcrudService, private router:ActivatedRoute, private routers: Router) { }
  flight:Adminflight;

  ngOnInit(): void {
    this.service.getByflightname(this.router.snapshot.params['flightname']).subscribe((data)=>
    this.flight={
      flight_name:data["flight_name"],
      source_airport_id:data["source_airport_id"],
      destination_airport_id:data["destination_airport_id"],
      departure_time:data["departure_time"],
      arrival_time:data["arrival_time"],
      business_fare:data["business_fare"],
      economic_fare:data["economic_fare"]
      }
    )
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

  delete(flightname)
  {
    Swal.fire('Deleting Flight');    Swal.showLoading();
    this.service.deleteflight(flightname).subscribe();
    Swal.close(); 
    this.routers.navigate([`${'viewallflights'}`]);
  }
}
