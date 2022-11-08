import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
import { NavController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public http:CommonService, public nav:NavController) { }
  public username:string
  public password:string

  ngOnInit() {

  }
  login(){
    this.http.ajaxLoginPost("/Token", this.username+"", this.password+"")
    .then((data:any)=>{
      localStorage.setItem("Token",data.token_type + " " + data.access_token)
      this.http.ajaxGet("/api/User").then(
        (res:any)=>{
          console.log(res)
          localStorage.setItem("User",JSON.stringify(res))
          this.nav.navigateRoot('tabs')
      })
    },(message:any)=>{
    if(message.error){
      console.log(message.error.error)
      alert(message.error.error+"")
    }
  })
}

}
