import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {RouteReuseService} from '../route-reuse-service.service'
import {RouteReuseStrategy} from '@angular/router';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
  providers: [{provide: RouteReuseStrategy, useClass: RouteReuseService}],
})
export class TabsPageModule {}
