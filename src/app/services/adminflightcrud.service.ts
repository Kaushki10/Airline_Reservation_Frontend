import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Adminflight } from '../models/adminflight';

@Injectable({
  providedIn: 'root'
})
export class AdminflightcrudService {
  private apiServer = environment.url+"admin/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public refreshcheck=true;
  constructor(private httpClient: HttpClient) { }
  
  getAll(): Observable<Adminflight[]> {
    return this.httpClient.get<Adminflight[]>(this.apiServer+"flights")
  }

  deleteflight(flightname:string){
    this.refreshcheck=false;
    return this.httpClient.delete<Adminflight>(this.apiServer +"flight/"+ flightname, this.httpOptions)  
    
  }

  getByflightname(flightname:String): Observable<Adminflight> {
    return this.httpClient.get<Adminflight>(this.apiServer+"flight/"+ flightname)
  } 
 
  // updateflight(flightnumber:Number, flight): Observable<Adminflight> {
  //   this.refreshcheck=false;
  //   return this.httpClient.put<Adminflight>(this.apiServer+ flightnumber, JSON.stringify(flight), this.httpOptions)
  // }  
  
  addflight(flight:any): Observable<any> {
    flight.source_airport_id=parseInt(flight.source_airport_id);
    flight.destination_airport_id=parseInt(flight.destination_airport_id);

    this.refreshcheck=false;
    return this.httpClient.post<any>(this.apiServer+"addflight", JSON.stringify(flight), this.httpOptions)
  }
}