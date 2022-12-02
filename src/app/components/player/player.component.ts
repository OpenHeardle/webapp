import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-player',
    template: `
        <ion-grid>
            <ion-row>
                <ion-col size="12" [hidden]="false">
                    <iframe id="player" width="100%" height="166" [src]="getUrl() | safe">
                    </iframe>
                </ion-col>
            </ion-row>
        </ion-grid>
    `,
    styles: [``]
})
export class PlayerComponent {

    @Input() public songURL: string = "https://soundcloud.com/dualipa/levitating";
    public songPlaying: boolean = false;
    public availableSeconds: number = 2;
    private playerTimeout: any = null;
    public player: any = null;

    constructor(
        private sanitizer: DomSanitizer
    ) {
    }

    public play() {
        const player = document.getElementById('player') as HTMLIFrameElement;
        if (player.contentWindow) {
            if (!this.songPlaying) {
                this.startPlayer(player.contentWindow);
                this.playerTimeout = setTimeout(() => {
                    this.stopPlayer(player.contentWindow!);
                    this.seekTo(player.contentWindow!, 0);
                }, this.availableSeconds * 1000);
            } else {
                clearTimeout(this.playerTimeout);
                this.stopPlayer(player.contentWindow);
            }
        }
    }

    private startPlayer(player: Window) {
        player.postMessage('{"method":"play"}', '*');
        this.songPlaying = true;
    }

    private stopPlayer(player: Window) {
        player.postMessage('{"method":"pause"}', '*');
        this.songPlaying = false;
    }

    private seekTo(player: Window, seconds: number) {
        player.postMessage(`{"method":"seekTo","value":${seconds}}`, '*');
    }


    public getUrl() {
        return `https://w.soundcloud.com/player/?url=${this.songURL}`;
    }
}
