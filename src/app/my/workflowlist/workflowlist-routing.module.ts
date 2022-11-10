import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowlistPage } from './workflowlist.page';

const routes: Routes = [
  {
    path: '',
    component: WorkflowlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowlistPageRoutingModule {}
