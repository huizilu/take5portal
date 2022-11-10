import { Component, OnInit,Input,OnDestroy} from '@angular/core';
import {CommonService} from '../../../common.service';
import {MessageComponent} from '../../message/message.component'
import { AlertController,IonNav,NavController } from '@ionic/angular';

@Component({
  selector: 'app-messagecontent',
  templateUrl: './messagecontent.component.html',
  styleUrls: ['./messagecontent.component.scss'],
})
export class MessagecontentComponent implements OnInit,OnDestroy{

  @Input() messageid:string
  @Input() parentView:MessageComponent
  public sender:string
  public To:[]
  public Cc:[]
  public senddate:string
  public messageidtxt:string
  public subject:string

  constructor(public http:CommonService,
    public alertController:AlertController,
    public navcon:NavController,
    public nav:IonNav) {

   }

  ngOnDestroy(): void {
    console.info('ngOnDestroy')
    this.parentView.refresh('ffffff')
  }


  ngOnInit() {
    console.log(this.messageid)
    this.getMessageDetail(this.messageid)
  }


  getMessageDetail(messageid:string){
    const user:any = localStorage.getItem('User')
    // console.log(JSON.parse(user))
    this.http.ajaxGet('/api/messages',{
      messageid:this.messageid,
      updateread:true,
      empid:JSON.parse(user).empid
    }).then((res:any)=>{
      console.log(res)
      var div = document.querySelector('#body')
      div.innerHTML=res.body
      this.sender=res.Sender.empname
      this.To=res.To
      this.Cc=res.Cc
      this.senddate=res.senddate
      this.messageidtxt=res.messageidtxt
      this.subject=res.subject
    },error=>{

    })
  }

  deleteMessage(){
    const user:any = localStorage.getItem('User')
    console.log('delete')
    this.http.ajaxDelete('/api/messages',{
      messageid:this.messageid,
      empid:JSON.parse(user).empid
    }).then((res:any)=>{
      console.log(res)
      this.presentAlertDeleteSuccess(res.message)
    },error=>{

    })
  }

  //确认删除
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '确认删除这条消息吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: '确定',
          role: 'confirm',
          handler: () => {
            // this.handlerMessage = 'Alert confirmed';
            //删除消息
            this.deleteMessage()
          },
        },
      ],
    });

    await alert.present();

  }

  //删除成功提示
  async presentAlertDeleteSuccess(msg:string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [{
        text:'OK',
        handler:()=>{
          //都可以跳转
         this.nav.popToRoot()
        // this.navcon.navigateRoot('message')
        }
     }],
    });

    await alert.present();
  }

}
