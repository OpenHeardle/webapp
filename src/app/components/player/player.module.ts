import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PlayerComponent} from "./player.component";
import {SafePipe} from "../../pipes/SafePipe";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        PlayerComponent
    ],
    declarations: [PlayerComponent, SafePipe]
})
export class PlayerModule {}
