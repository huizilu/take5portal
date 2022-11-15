import { Component,OnInit} from '@angular/core';
import{CommonService}  from '../common.service'
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public dynamic:boolean = true
  constructor(public http:CommonService,public loadingCtrl:LoadingController) {

  }
  ngOnInit(): void {
    console.log("动态表单版本",this.http.company)
    this.showLoading()
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Waiting',
    });
    loading.present();
    loading.addEventListener('ionLoadingDidPresent', (event: any) => {
      console.log('ionLoadingDidPresent')
      this.getMessageCount()
    });
  }
  async dimissLoading() {
    await this.loadingCtrl.dismiss()

  }
  public count=[0,0,0,0,0,0,0,0,0,0];

  public getMessageCount(){
      Promise.all([
                   //休假审批
                   this.http.ajaxGet('/api/WorkflowForm/GetPendingLeaveApprovalList'),
                   //全部审批
                   this.http.ajaxGet('/api/WorkflowForm/GetPendingApprovalList'),
                   //我的待处理休假
                   this.http.ajaxGet('/api/WorkflowForm/GetMyPendingLeaveApplicationsList'),
                   //我的待处理申请
                   this.http.ajaxGet('/api/WorkflowForm/GetMyPendingApplicationsList'),
                   //我的已审批休假
                   this.http.ajaxGet('/api/WorkflowForm/GetMyClosedLeaveApplicationsList'),
                   //我的已审批申请
                   this.http.ajaxGet('/api/WorkflowForm/GetMyClosedApplicationsList'),
                   //我的监督待处理休假申请
                   this.http.ajaxGet('/api/WorkflowForm/GetPendingLeaveMonitorList'),
                   //我的监督待处理申请
                   this.http.ajaxGet('/api/WorkflowForm/GetPendingMonitorList'),
                   //我的团队休假申请
                   this.http.ajaxGet('/api/WorkflowForm/GetClosedLeaveApprovalList'),
                   //我的团队申请
                   this.http.ajaxGet('/api/WorkflowForm/GetClosedApprovalList'),
                  ]).then((res:any)=>{
                     console.log("dynamic list",res)
                     this.dimissLoading()
                     res.forEach((element,index) => {
                        this.count[index] = element.length
                     });
                  },(error)=>{
                     this.dimissLoading()
                  })
      }

}
