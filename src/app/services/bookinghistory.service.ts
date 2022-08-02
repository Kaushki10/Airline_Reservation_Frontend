import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class BookingHistoryService {
    private apiServer = environment.url+"user/";
    private useremail
    public bookedtickets
    public cancelledtickets
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'responseType':'text' as 'json'
   
  }
   constructor(private httpClient: HttpClient) {
    this.useremail = sessionStorage.getItem('user')

    }
    getbookeddata(email){
        return this.httpClient.get<[]>(this.apiServer+"bookings/"+email)
      
    }

    cancelticket(id)
    {
       
      return this.httpClient.delete(this.apiServer+"cancelbooking/"+id,this.httpOptions);

    }
  //   async getcancelleddata(){
  //     let params = new HttpParams();
  //     let apiServer =  environment.url + 'CancelHistory'
  //     params = params.append('mail', this.useremail);

  //     let cancelleddata =  await this.httpClient.get<[]>(apiServer,{ params: params }).toPromise()
  //     this.cancelledtickets = cancelleddata
  //     console.log(this.cancelledtickets)
    
  // }
  
  }