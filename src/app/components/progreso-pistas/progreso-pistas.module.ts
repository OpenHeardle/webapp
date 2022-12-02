import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ProgresoPistasComponent} from "./progreso-pistas-component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        ProgresoPistasComponent
    ],
    declarations: [ProgresoPistasComponent]
})
export class ProgresoPistasModule {}
