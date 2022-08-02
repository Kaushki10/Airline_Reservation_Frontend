import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loginservice } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import {TransactionService} from '../../services/transaction.service'
@Component({
  selector: 'app-paymentui',
  templateUrl: './paymentui.component.html',
  styleUrls: ['./paymentui.component.css']
})
export class PaymentuiComponent implements OnInit {

  constructor(private router:Router, private TransactionService:TransactionService,private service:Loginservice,private route:ActivatedRoute) { }
  public payment

  public passengers;
  public flightdetails;
  public booking_type;
  public class_type;
  public user_id;



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
    this.payment={
      name:'',
      cardnumber:null,
      expmonth:null,
      expyear:null,
      cvv:null
    }
    this.passengers=JSON.parse(this.route.snapshot.paramMap.get('passengers'));
    this.flightdetails=JSON.parse(this.route.snapshot.paramMap.get('flight'));
    this.booking_type=this.route.snapshot.paramMap.get('booking_type');
    this.class_type=this.route.snapshot.paramMap.get('class_type');
    this.service.getUserData(sessionStorage.getItem('user')).subscribe((d:any)=>{
      this.user_id=d.user_id;
    })
  }

  submitForm(paymentForm)
  {
      // delete paymentForm.cvc
      // delete paymentForm.name
      // this.TransactionService.card_details = paymentForm
     // this.TransactionService.post()
      this.TransactionService.post(this.user_id,this.flightdetails.flight_id,this.booking_type,new Date(),this.class_type,this.flightdetails.departure_time,'credit_card',this.passengers).subscribe(d=>{
        if(d=="Flight Booked Successfully"){
        Swal.fire(
          'Woohoo',
          'Your Tickets are booked :)',
          'success'
        )
        this.router.navigate([`${'/flight/payment/eticket'}`]);
        }
      },err=>{
        
          Swal.fire(
            `Transaction Failed (${err.error})`,
            'Try again later :(',
            'error'
          )
      })

  }
}
