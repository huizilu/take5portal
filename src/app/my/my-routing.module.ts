import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPage } from './my.page';
import { MessagePageModule } from '../my/message/message.module';
import { MessagePage } from '../my/message/message.page';

const routes: Routes = [
  {
    path: '',
    component: MyPage
  },
  {
    path: 'workflowlist',
    loadChildren: () => import('./workflowlist/workflowlist.module').then( m => m.WorkflowlistPageModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPageRoutingModule {}
