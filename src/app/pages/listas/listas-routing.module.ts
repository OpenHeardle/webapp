import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListasPage } from './listas.page';

const routes: Routes = [
  {
    path: '',
    component: ListasPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
