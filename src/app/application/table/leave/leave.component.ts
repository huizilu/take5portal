import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';

import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import {CommonService} from '../../../common.service'
import { LoadingController } from '@ionic/angular';
import { format } from 'date-fns';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit,AfterViewInit {
  public startdate:string=''
  public enddate:string
  public starttime:string=''
  public endtime:string
  public cleavetype = undefined;

  public wd_startdate;
  public wd_starttime;


  constructor(private chooser: Chooser,public http:CommonService,
              public loadingCtrl:LoadingController) { }

  ngAfterViewInit(): void {
    // console.log(this.wd_startdate);
    // this.wd_startdate = document.getElementById('wd_startdate')
    // this.wd_starttime = document.getElementById('wd_starttime')

    // console.log(this.wd_starttime);
    // this.wd_starttime.addEventListener('change',event=>{
    //   console.log('starttime',event.target.value)
    // })

  }

  public leavetypes:[];

  ngOnInit() {
    this.showLoading()
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: '获取休假类别中',
    });
    loading.present();
    loading.addEventListener('ionLoadingDidPresent', (event: any) => {
      console.log('ionLoadingDidPresent')
      this.getLeaveTypes()
    });
  }
  //获取休假类型
  getLeaveTypes(){
    this.http.ajaxGet('/api/LeaveCalc').then((res:any)=>{
      console.log(res.LeaveTypes)
      this.leavetypes=res.LeaveTypes
      this.loadingCtrl.dismiss()
    },error=>{
      alert(error)
      this.loadingCtrl.dismiss()
    })
  }

  addFile(){
    this.chooser.getFile()
    .then(
      file => {
      console.log(file ? file.name : 'canceled')
    })
    .catch((error: any) => console.error(error));
  }

 //选择休假类别
  public handleChange(event){
    console.log('休假类别',event.detail.value)
    this.cleavetype = event.detail.value
    // if(this.cleavetype.ishourly){
    //   this.wd_starttime = document.getElementById('wd_starttime')
    //   console.log(this.wd_starttime);
    //   this.wd_starttime.addEventListener('change',event=>{
    //     console.log('starttime',event.target.value)
    //   })
    // }
  }

  public startDateChange(){
    this.wd_startdate = document.getElementById('wd_startdate')
    console.log('开始日期',this.wd_startdate.value)
    // this.postT5pDayCount()
  }

  public startTimeChange(){
    this.wd_starttime = document.getElementById('wd_starttime')
    console.log('开始时间',this.wd_starttime.value)
  }


  starttimechange(event){
    this.wd_starttime = document.getElementById('wd_starttime')
    console.log('开始时间',this.wd_starttime.value)
  }
  postT5pDayCount(){
    let postdata={
      leavecode:'',
      specifyfromdate:'',
      specifytodate:'',
      fromdatemorning:true,
      fromdateafternoon:true,
      todatemorning:true,
      todateafternoon:true
    }
    //按天休假
    if(!this.cleavetype.ishourly){
      if(this.enddate==undefined){
        this.enddate=this.startdate
      }
      postdata.leavecode = this.cleavetype.leavecode,
      postdata.specifyfromdate = format(new Date(this.startdate),'yyyy-MM-dd')
      postdata.specifytodate = format(new Date(this.enddate),'yyyy-MM-dd')
    }
    this.http.ajaxPost('/api/leavecalc',postdata).then((res:any)=>{
      console.log('postT5pDayCount',res)
    },error=>{

    })
  }
}
