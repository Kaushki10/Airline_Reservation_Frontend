import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AdminloginService } from 'src/app/services/adminlogin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  verify=true;
  yes;
  public adminlogin;
  public response: String
  public timer : Boolean
  constructor(private loginservice:AdminloginService, private router: Router) { }
  faEyeSlash = faEyeSlash;
  faEye=faEye;
  visible = false;
  ngOnInit(): void {
    this.adminlogin={
      email:'',
      password:''
    };
  }
  clickoninput()
  {
    this.verify=true;
  }
  onClick()
  {
    this.visible = !this.visible;
  }
  submitForm(AdminLoginForm)
  {
   
    this.timer = true
    this.loginservice.login(AdminLoginForm.value).subscribe((d:any)=>{

      console.log(d);
      if(d == "Valid")
      {
        this.router.navigate([`${'viewallflights'}`]);
        sessionStorage.setItem('admin',AdminLoginForm.value.email)

      }
    },err=>{
      this.verify=false;
      this.response = err.error;
      console.log(this.verify);
    })

    setTimeout(() => {
      this.timer = false
    },3000)
  }
}
