import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-progreso-pistas',
    template: `
        <ion-grid>
            <ion-row>
                <ion-col size="1">
                    <ion-progress-bar [value]="progress > 0 ? 1 : 0"></ion-progress-bar>
                </ion-col>
                <ion-col size="1">
                    <ion-progress-bar [value]="progress > 1 ? 1 : 0"></ion-progress-bar>
                </ion-col>
                <ion-col size="2">
                    <ion-progress-bar [value]="progress > 2 ? 1 : 0"></ion-progress-bar>
                </ion-col>
                <ion-col size="4">
                    <ion-progress-bar [value]="progress > 3 ? 1 : 0"></ion-progress-bar>
                </ion-col>
                <ion-col size="4">
                    <ion-progress-bar [value]="progress > 4 ? 1 : 0"></ion-progress-bar>
                </ion-col>
            </ion-row>
        </ion-grid>
    `,
    styles: [`
        ion-progress-bar {
            --progress-background: #FF6C82;
            --background: #b3b3b3;
            height: 20px;
        }

        ion-grid {
            --ion-grid-padding: 0px;
            margin: 0;
        }

        ion-col {
            padding-inline-end: 2px;
            padding-inline-start: 0;
        }
    `]
})
export class ProgresoPistasComponent {

    public progress: number = 0;

    constructor() {
    }

    public setProgress(progress: number) {
        this.progress = progress;
    }

    public addProgress() {
        this.progress++;
    }
}
