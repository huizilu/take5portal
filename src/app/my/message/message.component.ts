import{MessagecontentComponent} from './messagecontent/messagecontent.component'
import { Component, EventEmitter, OnInit,ViewChild} from '@angular/core';
import { IonContent, IonInfiniteScroll,LoadingController } from '@ionic/angular';
import {CommonService} from '../../common.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  component = MessagecontentComponent
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent
//默认未读消息
public unread:boolean = true

public page = 1

public list=[]

public outer=function(event){
  console.log(event)
}

constructor(public http:CommonService,private loadingCtrl: LoadingController) {

}
refresh(event:any){
  console.info('refresh',event)
  this.getMessageList(this.unread,this.page,null,true)
}
setMessageid(messageid:string,component:MessageComponent){
  this.component.prototype.messageid=messageid
  this.component.prototype.parentView=component
}
ngOnInit() {
  this.getMessageList(this.unread,this.page,null,true)
}
handleRefresh(event){
  console.log('refresh')
  this.getMessageList(this.unread,0,event,true)
}

loadData(event) {
  this.getMessageList(this.unread,this.page,event,false)
}

handleMessageTypeChange(event){
  console.log('handleMessageTypeChange',event.detail.value)
  if(event.detail.value=='unread'){
    this.unread = true
    this.getMessageList(this.unread,1,null,true)
  }else{
    this.unread = false
    this.getMessageList(this.unread,1,null,true)
  }
}

getMessageList(unread:boolean,page:number,event:any,isRefresh:boolean){
  this.http.ajaxGet('/api/MessageAll/GetMyMessageList',{
    isUnread:unread,
    page:page
  })
  .then((res:any)=>{
    console.log(res)
    if(event!=null){
       event.target.complete();
    }
    if(isRefresh){
      this.page=1
      this.list= res
      this.content.scrollToTop(500)
    }else{
      this.page++
      this.list = [...this.list,...res]
    }
    if(res.length==0){
      this.infiniteScroll.disabled = true
    }else{
      this.infiniteScroll.disabled = false
    }
  },error=>{
    if(event!=null){
      event.target.complete();
    }
  })
}

}
