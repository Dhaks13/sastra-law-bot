import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from '../components/loader/loader.component';
import { LawChatComponent } from '../components/lawchat/lawchat.component';
import { PdbComponent } from '../components/pdb/pdb.component';
import { DssComponent } from '../components/dss/dss.component';

@NgModule({
  declarations: [LoaderComponent, LawChatComponent, PdbComponent, DssComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [LoaderComponent, LawChatComponent, PdbComponent, DssComponent]
})
export class SharedModule {}
