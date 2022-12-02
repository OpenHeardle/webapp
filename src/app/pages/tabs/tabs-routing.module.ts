import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'jugar',
        loadChildren: () => import('../jugar/jugar.module').then(m => m.JugarPageModule)
      },
      {
        path: 'listas',
        loadChildren: () => import('../listas/listas.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'ajustes',
        loadChildren: () => import('../ajustes/ajustes.module').then(m => m.AjustesModule)
      },
      {
        path: '',
        redirectTo: '/tabs/jugar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/jugar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
