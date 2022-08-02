import { Component, OnInit } from '@angular/core';
import {AirportsService} from '../../services/airports.service';
import {SearchflightService} from '../../services/searchflight.service'
import {Searchflight} from '../../models/searchflight'
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Airport } from 'src/app/models/airport';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service : AirportsService, private GetFlightsService:SearchflightService,private router: Router) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.minDate = new Date(currentYear,currentMonth,currentDate)
    this.maxDate = new Date(currentYear,currentMonth+2,currentDate)
  }
  public loggedIn : boolean = false
  faUser = faUser
  public airports: Airport[] = []
  public travellers:number[] = [0,1,2,3,4,5,6,7,8,9]
  public departurecity:string 
  public arrivalcity:string
  minDate: Date;
  maxDate: Date;
  pageName = 'flight/search'
  model:Searchflight;

  ngOnInit(): void {
    if(sessionStorage.getItem('user'))
    {
      this.loggedIn = true
    }
    
  this.service.getAirports().subscribe(d=>{
      this.airports=d;
      this.model = new Searchflight("one_way",this.airports[0].airport_id, this.airports[1].airport_id, new Date(),null, 0,0,0,"business");

    },er=>{
      console.log(er.error);
    })

  }


  
  
  
  handlelogout() 
  {
    sessionStorage.removeItem('user')
    this.loggedIn=false
    this.router.navigate([`${'/'}`]);
  }
  onSubmit()
  {
    Swal.fire('Fetching Your Flights');    
    Swal.showLoading();

    if(this.model.booking_type == 'one_way')
    {
      this.GetFlightsService.SearchFlights(this.model.booking_type,this.model.source_airport_id,this.model.destination_airport_id,this.model.departure_date,this.model.return_date,this.model.adults,this.model.childs,this.model.infants,this.model.class_type).subscribe(d=>{
        Swal.close();
        this.router.navigate([`${this.pageName}`,{flights:JSON.stringify(d),source:this.model.source_airport_id,destination:this.model.destination_airport_id,booking_type:this.model.booking_type,class_type:this.model.class_type}]);
      });
        
  
      // this.GetFlightsService.flightdata;

      // },err=>{
      //   Swal.close()
      //   Swal.fire('Internal Server Error', 'Try again later' , 'error')
      // });
    }
    
     



  }

}
