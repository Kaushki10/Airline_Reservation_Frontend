import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airport } from '../models/airport';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {


  private apiServer = environment.url + "user/";
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
  constructor(private httpClient: HttpClient) { 
  }

  getAirports():Observable<Airport[]>{
    return this.httpClient.get<Airport[]>(this.apiServer+"airports")    

  }

}
