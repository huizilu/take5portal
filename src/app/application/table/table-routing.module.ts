import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablePage } from './table.page';
import {LeaveComponent} from './leave/leave.component'
import {AttandanceComponent} from './attandance/attandance.component'
import {OtComponent} from './ot/ot.component'

const routes: Routes = [
  {
    path: '',
    component: TablePage,
    children:[
      {
        path:'leave',
        component:LeaveComponent
      },
      {
        path:'ot',
        component:OtComponent
      },
      {
        path:'attandance',
        component:AttandanceComponent
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablePageRoutingModule {}
