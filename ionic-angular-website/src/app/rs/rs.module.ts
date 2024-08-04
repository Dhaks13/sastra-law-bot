// src/app/chat/chat.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RSPageRoutingModule } from './rs-routing.module';
import { RSPage } from './rs.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RSPageRoutingModule,
    SharedModule,
  ],
  declarations: [RSPage]
})
export class RSPageModule {}
