import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import {Signup} from '../models/signup'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Signupservice {

  private apiServer = environment.url + "user/register";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'responseType':'text' as 'json'
  }
  constructor(private httpClient: HttpClient) { }
  
  post(data:Signup) {
     return this.httpClient.post<any>(this.apiServer,data,this.httpOptions)
  
  }
 
}
