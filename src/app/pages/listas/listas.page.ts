import { Component } from '@angular/core';

@Component({
  selector: 'app-listas',
  template: `
  <ion-header [translucent]="true">
    <ion-toolbar>
      <ion-title>
          🎧Open Heardle - Listas
      </ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content [fullscreen]="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">🎧Open Heardle - Listas</ion-title>
      </ion-toolbar>
    </ion-header>
  </ion-content>
  `,
  styles: [``]
})
export class ListasPage {

  constructor() {}

}
