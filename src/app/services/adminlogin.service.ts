import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminloginService {

  private apiServer = environment.url + "admin/login";
  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
responseType:'text' as 'json'
}
constructor(private httpClient: HttpClient) { }
login(data:any):Observable<any>
{
  return this.httpClient.post<any>(this.apiServer,data,this.httpOptions)
}
}
