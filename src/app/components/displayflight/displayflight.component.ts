import { Component, OnInit } from '@angular/core';
import {SearchflightService} from '../../services/searchflight.service'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { AirportsService } from 'src/app/services/airports.service';
import { Airport } from 'src/app/models/airport';
@Component({
  selector: 'app-displayflight',
  templateUrl: './displayflight.component.html',
  styleUrls: ['./displayflight.component.css']
})
export class DisplayflightComponent implements OnInit {

  constructor(public service : SearchflightService,private airpServ:AirportsService,private route:ActivatedRoute) { }
  public flights =[]
  public airports=[]
  public departure:String;
  public arrival:String;
  public booking_type:String;
  public class_type:String;
  faUser=faUser
  public isLoggedIn: boolean = false
  ngOnInit(): void {
    if(sessionStorage.getItem('user'))
    {
        this.isLoggedIn = true
    }
    this.flights=JSON.parse(this.route.snapshot.paramMap.get('flights'));
    this.booking_type=this.route.snapshot.paramMap.get('booking_type');
    this.class_type=this.route.snapshot.paramMap.get('class_type');

    console.log(this.flights);
    this.airpServ.getAirports().subscribe((d:Airport[])=> {
    this.airports=d;
    this.departure=this.airports.find(a=>a.airport_id==Number(this.route.snapshot.paramMap.get('source')))?.city;
    this.arrival=this.airports.find(a=>a.airport_id==Number(this.route.snapshot.paramMap.get('destination')))?.city;
  });
   
  }
}
