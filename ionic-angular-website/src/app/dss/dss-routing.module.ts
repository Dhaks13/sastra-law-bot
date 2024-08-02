import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DSSPage } from './dss.page';

const routes: Routes = [
  {
    path: '',
    component: DSSPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DSSPageRoutingModule {}
