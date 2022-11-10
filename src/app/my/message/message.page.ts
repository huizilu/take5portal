import { Component, EventEmitter, OnInit,ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll,LoadingController } from '@ionic/angular';
import {CommonService} from '../../common.service';
import {MessageComponent} from '../message/message.component'


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  public component = MessageComponent

  constructor(public http:CommonService,private loadingCtrl: LoadingController) {}

  ngOnInit() { }
}
