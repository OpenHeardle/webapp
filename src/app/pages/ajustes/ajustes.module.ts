import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AjustesPage } from './ajustes.page';

import { Tab3PageRoutingModule } from './ajustes-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule
  ],
  declarations: [AjustesPage]
})
export class AjustesModule {}
