import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablePageRoutingModule } from './table-routing.module';

import { TablePage } from './table.page';
import { LeaveComponent } from './leave/leave.component';
import { OtComponent } from './ot/ot.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    TablePageRoutingModule
  ],
  declarations: [TablePage,LeaveComponent,OtComponent]
})
export class TablePageModule {}
