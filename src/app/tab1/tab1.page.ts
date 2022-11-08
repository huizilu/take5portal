import { Component,OnInit } from '@angular/core';
import {CommonService} from '../common.service';
import { LoadingController } from '@ionic/angular';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public empname:string=''
  public position:string=''
  public rostList=[]
  public year_entitlement = 0
  public year_taken = 0
  public year_balance = 0
  public portrait:string=''

  constructor(public http:CommonService,private loadingCtrl: LoadingController) {

  }
  ngOnInit() {
    console.log('ngonit tab1')
    this.showLoading()
    this.getEmployeeInfo()
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Waiting',
    });
    loading.present();
  }

  getEmployeeInfo(){
    this.http.ajaxGet('/api/Employee').then(
      (data:any)=>{
      this.loadingCtrl.dismiss()
      localStorage.setItem('EmpInfo',JSON.stringify(data.EmpInfo))
      localStorage.setItem('MachineGroup',JSON.stringify(data.MachineGroup))
      this.year_entitlement = data.AnnualLeave.year_entitlement
      this.year_taken = data.AnnualLeave.year_taken
      this.year_balance = data.AnnualLeave.year_balance
      this.rostList = data.RosterList
      this.empname=data.EmpInfo.empname
      this.position=data.Position.positionname
      this.portrait = data.EmpInfo.portrait!=""?data.EmpInfo.portrait:'https://ionicframework.com/docs/img/demos/avatar.svg'
    },(error=>{
      this.loadingCtrl.dismiss()
    }))
  }
}
