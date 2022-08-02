import { Component, OnInit } from '@angular/core';
import {Passenger} from '../../models/passengers'
import {SelectedFlightService} from '../../services/selectedflight.service'
import {FetchSeatService} from '../../services/fetchseat.service'
import { ActivatedRoute, Router } from '@angular/router';
import {TransactionService} from '../../services/transaction.service'
import Swal from 'sweetalert2';
import { Seat } from 'src/app/models/seat';
@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {

  constructor(public flightselected:SelectedFlightService, public fetchseats:FetchSeatService,public router : Router,public TransactionService:TransactionService,private route:ActivatedRoute ) { }

  public count :number;
  public seatprice;
  public data:any;
  public totalprice:number
  passenger = new Passenger()
  public isLoggedIn: boolean = false
  public dataarray:Passenger[] = []
  public booking_type:string;
  public class_type:string;

  public seats:Seat[];
  public leftseats:Seat[];
 
    ngOnInit(): void {
      if(!sessionStorage.getItem('user'))
      {
        Swal.fire({
          title: 'Oops!',
          text: 'Login to Continue!',
          icon: 'warning',
         
        })
        this.router.navigate([`${'/login'}`]);
      }
        else 
        {
        this.isLoggedIn = true
        }
      
        this.data = JSON.parse(this.route.snapshot.paramMap.get('data'));
        this.flightselected.getSeatsByFlightId(this.data.flight_id).subscribe((d:Seat[])=>{
          this.seats=d;
        
          this.leftseats=d.filter(i=>i.is_booked==false && i.seat_type==this.class_type);
        });
        this.booking_type=this.route.snapshot.paramMap.get('booking_type');
        this.class_type=this.route.snapshot.paramMap.get('class_type');

        this.passenger.gender="Male";
        this.dataarray.push(this.passenger)
        
        this.count =1;
        // this.fetchprice()
        this.seatprice=this.class_type=="economic"?this.data.economic_fare:this.data.business_fare;
        this.totalprice=this.seatprice+708;
        
    }
      
      onAdd()
      {
        
        if(this.count<=this.leftseats.length)
        {
          this.passenger = new Passenger()
          this.passenger.gender='Male';
          this.dataarray.push(this.passenger)
          this.count++;
        }
        console.log(this.dataarray);
      }
 
    onSubmit()
      {
        for(let i=0;i<this.dataarray.length;i++){
          var emailregex =  new RegExp ("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
          var phoneregex = new RegExp("^[0-9]{10}$")

         
          if(!emailregex.test(this.dataarray[i].email) || !phoneregex.test(this.dataarray[i].phone_no))
          {
            console.log(this.dataarray[i]);
            Swal.fire('oops', 'Check your contact details', 'error')    
            return
          }
        }
   
        // this.fetchseats.number_of_seats = this.flightselected.number_of_seats
        // this.fetchseats.seatclass = this.flightselected.travel_status == true?"business":"economy"
        // let response = await this.fetchseats.fetchseats(this.flightselected.flight_number)
        if(this.leftseats.length)
        {
          this.router.navigate([`${'flight/seats'}`,{data:JSON.stringify(this.data),booking_type:this.booking_type,class_type:this.class_type,passengers:JSON.stringify(this.dataarray),totalprice:this.totalprice+708}]);
          this.TransactionService.passengers = this.dataarray
          this.TransactionService.final_amount = this.totalprice
        }
        else 
        {
          Swal.fire('Oops' , 'An unexpected error occured, try again later', 'error')
          this.router.navigate([`${''}`]);
        }
        
      
      }

      // async fetchprice() 
      // {
      //   let response = await this.flightselected.getFlightPrice(this.flightselected.flight_number,this.flightselected.travel_status)
      //   if(response != 'false')
      //     this.seatprice = response
      //   else 
      //     {
      //       Swal.fire('Oops' , 'Error fetching price', 'error')
      //       return
      //     }
      //   let current_date = new Date()
      //   let travel_date = new Date(this.flightselected.travel_date)
      //   let difference_days = (travel_date.getTime() - current_date.getTime())/(1000*3600*24)
      //   difference_days = (Math.round(difference_days))
      //   if(difference_days <= 0) 
      //     this.seatprice = this.seatprice * 2
      //   else 
      //     this.seatprice = (this.seatprice + (this.seatprice/difference_days)).toFixed(0)
      //   this.seatprice = this.seatprice*this.flightselectobj.number_of_seats
      //   this.totalprice = this.seatprice+698+10
      // } 
}
