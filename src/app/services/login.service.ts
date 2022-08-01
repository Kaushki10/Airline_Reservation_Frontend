import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class Loginservice {
    private apiServer = environment.url + "user/login";
    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'responseType':'text' as 'json'
  }
  constructor(private httpClient: HttpClient) { }
  login(data:any)
  {
       return this.httpClient.post(this.apiServer,data,this.httpOptions);
  }
}