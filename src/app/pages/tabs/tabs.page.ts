import {Component} from '@angular/core';

@Component({
    selector: 'app-tabs',
    template: `
        <ion-tabs >
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="jugar">
                    <ion-icon name="musical-notes-outline"></ion-icon>
                    <ion-label>Jugar</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="listas">
                    <ion-icon name="list-outline"></ion-icon>
                    <ion-label>Listas</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="ajustes">
                    <ion-icon name="settings-outline"></ion-icon>
                    <ion-label>Ajustes</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    `,
    styles: [``]
})
export class TabsPage {

    public currentTab = 'jugar';

    constructor() {
    }

    public ionTabsDidChange(event: any) {
        this.currentTab = event.tab;
    }
}
