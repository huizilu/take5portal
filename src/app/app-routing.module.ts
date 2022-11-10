import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
    {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'my',
    loadChildren: () => import('./my/my.module').then( m => m.MyPageModule)
  },
 {
    path:'message',
    loadChildren: () => import('./my/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path:'workflowlist',
    loadChildren: () => import('./my/workflowlist/workflowlist.module').then( m => m.WorkflowlistPageModule)
  },
  {
    path: 'table',
    loadChildren: () => import('./application/table/table.module').then( m => m.TablePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
