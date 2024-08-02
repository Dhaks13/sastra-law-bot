import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RSPage } from './rs.page';

const routes: Routes = [
  {
    path: '',
    component: RSPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RSPageRoutingModule {}
