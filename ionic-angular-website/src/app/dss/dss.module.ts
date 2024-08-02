// src/app/dss/dss.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DSSPageRoutingModule } from './dss-routing.module';
import { DSSPage } from './dss.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DSSPageRoutingModule,
    SharedModule,
  ],
  declarations: [DSSPage]
})
export class DSSPageModule {}
