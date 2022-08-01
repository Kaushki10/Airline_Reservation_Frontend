import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {Loginservice} from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginservice:Loginservice, public router: Router) { }
  faEyeSlash = faEyeSlash;
  faEye=faEye;
  visible = false;
  public response: string
  public timer : boolean

  ngOnInit(): void {
  }
  onClick()
  {
    this.visible = !this.visible;
  }
  onSubmit(data) {
    this.timer = true
    Swal.fire('Logging In');    
    Swal.showLoading();
    this.loginservice.login(data).subscribe(d=>{
      if(d=="Valid"){
        this.router.navigate([`${'/'}`]);
        sessionStorage.setItem('user',data.email)
      }else{
        this.response=this.response;
      }
    });
    Swal.close()
    // if(response == "Valid")
    //   {


    //   }
    // else 
    //   {
    //     if(response == "500" )
    //       {
    //         Swal.fire('Internal Server Error', 'Try again later' , 'error')
    //       }
    //       else
    //         this.response = response
    //   }
    setTimeout(() => {
      this.timer = false
    },3000)
    }

}
