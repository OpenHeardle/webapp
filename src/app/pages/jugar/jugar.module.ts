import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {JugarPage} from './jugar.page';

import {JugarRoutingModule} from './jugar-routing.module';
import {ProgresoPistasModule} from "../../components/progreso-pistas/progreso-pistas.module";
import {PlayerModule} from "../../components/player/player.module";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DividerModule} from "primeng/divider";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        AutoCompleteModule,
        DividerModule,
        JugarRoutingModule, ProgresoPistasModule, PlayerModule
    ],
    declarations: [JugarPage]
})
export class JugarPageModule {
}
