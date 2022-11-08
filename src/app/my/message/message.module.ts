import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagePageRoutingModule } from './message-routing.module';

import { MessagePage } from './message.page';
import { HttpClientModule } from '@angular/common/http';
import {MessagecontentComponent} from './messagecontent/messagecontent.component'
import{MessageComponent} from './message.component'
import {CommonService} from '../../common.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagePageRoutingModule,
    HttpClientModule
  ],
  declarations: [MessagePage,MessagecontentComponent,MessageComponent],
  providers:[CommonService]
})
export class MessagePageModule {}
