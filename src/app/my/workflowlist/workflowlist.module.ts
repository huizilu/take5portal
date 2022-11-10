import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkflowlistPageRoutingModule } from './workflowlist-routing.module';

import { WorkflowlistPage } from './workflowlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkflowlistPageRoutingModule
  ],
  declarations: [WorkflowlistPage]
})
export class WorkflowlistPageModule {}
