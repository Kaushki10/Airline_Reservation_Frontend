import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpParams } from "@angular/common/http";
import {SelectedFlightService} from '../services/selectedflight.service'
import { environment } from 'src/environments/environment';
import { Passenger } from '../models/passengers';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        'responseType':'text' as 'json'
      }
      private apiServer = environment.url + "user/bookflight";
      // public passengers:any
      public seatArray = []
      public current_date : string
      public final_amount:number
      public card_details
      public useremail:string
      public seat_type:string
      public body:any
      public contact_email:string
      public contact_no:string

      public booked_information

    constructor(private httpClient: HttpClient, private SelectedFlightService: SelectedFlightService) { 
            this.current_date = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
            this.useremail = sessionStorage.getItem('user')
            this.seat_type = this.SelectedFlightService.travel_status ? "business":"economy"
    }   

    post(user_id,flight_id,booking_type,return_date,class_type,travel_date,payment_mode,passengers:Passenger[])
    {

        this.body = {
            "user_id": user_id,
            "flight_id": flight_id,
            "booking_type":booking_type,
            "return_date":return_date,
            "class_type":class_type,
            "travel_date" : travel_date,
            "payment_mode":payment_mode,
            "passengers":passengers        
        }
       
        return this.httpClient.post(this.apiServer,this.body,this.httpOptions);
        
      
    }
}