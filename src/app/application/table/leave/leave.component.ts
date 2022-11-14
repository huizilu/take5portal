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
  public startdate:string=undefined
  public enddate:string=undefined
  public starttime:string=''
  public endtime:string
  public cleavetype = undefined;
  public leavecalc =undefined;

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
    this.postT5pDayCount('wd_startdate',this.wd_startdate.value)
  }

  starttimechange(event){
    this.wd_starttime = document.getElementById('wd_starttime')
    console.log('开始时间',this.wd_starttime.value)
  }

  postT5pDayCount(wd:string,data:string){
    console.log(wd,data)
    let postdata={
      leavecode:'',
      specifyfromdate:'',
      specifytodate:'',
      fromdatemorning:true,
      fromdateafternoon:true,
      todatemorning:true,
      todateafternoon:true
    }
    if(!this.cleavetype.ishourly){
      postdata.leavecode = this.cleavetype.leavecode
      if(this.startdate!=undefined){
        postdata.specifyfromdate = format(new Date(this.startdate),'yyyy-MM-dd')
      }
      if(this.enddate!=undefined){
      postdata.specifytodate = format(new Date(this.enddate),'yyyy-MM-dd')
      }
    }
    if(wd=='wd_startdate'){
      postdata.specifyfromdate = format(new Date(data),'yyyy-MM-dd')
      if(this.enddate==undefined){
      postdata.specifytodate = format(new Date(data),'yyyy-MM-dd')
      }
    }
    this.http.ajaxPost('/api/leavecalc',postdata).then((res:any)=>{
      console.log('postT5pDayCount',res)
      this.leavecalc = res
      this.startdate=res.specifyfromdate
      this.enddate =res.specifytodate
    },error=>{
      console.log('postT5pDayCount error',JSON.stringify(error))
    })
  }

  public file;
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  async submitForm() {
    let formData = new FormData();
    formData.append("Attachment_" + 0, this.file, this.file.name);
    this.leavecalc.leavecode=this.cleavetype.leavecode
    formData.append("leaveinfo",JSON.stringify(this.leavecalc))
    this.http.ajaxPost("/api/EmpLeave/PostLeaveWithAttachment", formData).then(res=>{
      console.log(res)
    },error=>{

    })
  }


}
