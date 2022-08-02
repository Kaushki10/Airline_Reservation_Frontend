import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {BookingHistoryService} from '../../../services/bookinghistory.service'

@Component({
  selector: 'app-cancellations',
  templateUrl: './cancellations.component.html',
  styleUrls: ['./cancellations.component.css']
})
export class CancellationsComponent implements OnInit {

  constructor(private bookinghistoryservice : BookingHistoryService,public router:Router) { }
  public cancelledtickets = []


  ngOnInit() {
    if(!sessionStorage.getItem('user'))
    {
      Swal.fire({
        title: 'Oops!',
        text: 'Login to Continue!',
        icon: 'warning',
       
      })
      this.router.navigate([`${'/login'}`]);
    }
    this.bookinghistoryservice.getbookeddata(sessionStorage.getItem('user')).subscribe((d:any)=>{
      this.cancelledtickets = d.filter(b=>b.booking_status=="cancelled");
    })
  }
}
