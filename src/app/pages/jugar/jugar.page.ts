import {Component, OnInit, ViewChild} from '@angular/core';
import {ProgresoPistasComponent} from "../../components/progreso-pistas/progreso-pistas-component";
import {PlayerComponent} from "../../components/player/player.component";
import {PlaylistsService} from "../../services/playlists.service";
import {FilterService} from "primeng/api";
import {AlertController} from "@ionic/angular";


@Component({
    selector: 'app-jugar',
    template: `
        <ion-header [translucent]="true">
            <ion-toolbar>
                <ion-title>
                    🎧Open Heardle - Jugar
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content [fullscreen]="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">🎧Open Heardle - Jugar</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-grid>
                <ion-row class="ion-justify-content-center">
                    <ion-col size="12" size-md="8">
                        <ion-list>
                            <ion-item>
                                <ion-label position="stacked">Playlist</ion-label>
                                <ion-select placeholder="Select Playlist" (ionChange)="onPlaylistChange($event)"
                                            [(ngModel)]="selectedPlaylist">
                                    <ion-select-option *ngFor="let playlist of allPlaylists" [value]="playlist">
                                        {{playlist}}
                                    </ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <div [hidden]="selectedPlaylist.length <= 0">
                <ion-card [hidden]="!showPlayer">
                    <ion-card-header>
                        <ion-card-title>{{song.name}}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <app-player [songURL]="songURL" ></app-player>
                    </ion-card-content>
                </ion-card>
                <p-divider></p-divider>
                <ion-grid>
                    <ion-row  class="ion-justify-content-center">
                        <ion-col size="12" size-md="4">
                            <span class="p-fluid">
                                <p-autoComplete
                                    [(ngModel)]="selectedOption"
                                    [suggestions]="filteredOptions"
                                    (completeMethod)="search($event)"
                                    field="name"
                                    [dropdown]="true"
                                    [virtualScroll]="true"
                                    [virtualScrollItemSize]="34"
                                >
                                </p-autoComplete>
                            </span>
                        </ion-col>
                        <ion-col size="12" size-md="4">
                            <ion-button (click)="adivinar()" expand="block">
                                Adivinar
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                <p-divider></p-divider>
                <ion-grid>
                    <ion-row class="ion-justify-content-center">
                        <ion-col size="12" size-md="8">
                            <app-progreso-pistas></app-progreso-pistas>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-justify-content-center" style="text-align: center">
                        <ion-col size="6" size-md="4">
                            <ion-button (click)="resolver()" shape="round">Resolver</ion-button>
                        </ion-col>
                        <ion-col size="6" size-md="4">
                            <ion-button (click)="addProgress()" shape="round" fill="outline"
                                        [disabled]="this.progresoPistasComponent!.progress >= 5">
                                Añadir pista
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <ion-fab vertical="bottom" horizontal="center" slot="fixed">
                <ion-fab-button (click)="play()" [hidden]="playerComponent!.songPlaying" color="primary">
                    <ion-icon name="play-outline"></ion-icon>
                </ion-fab-button>
                <ion-fab-button (click)="play()" [hidden]="!playerComponent!.songPlaying" color="primary">
                    <ion-icon name="stop-outline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    `,
    styles: [`
        ion-card {
            margin: 10px;
        }

        ion-select {
            width: 100%;
        }
    `],
})
export class JugarPage implements OnInit {

    @ViewChild(ProgresoPistasComponent, {static: true}) progresoPistasComponent: ProgresoPistasComponent | undefined;
    @ViewChild(PlayerComponent, {static: true}) playerComponent: PlayerComponent | undefined;
    public song: any = {
        name: 'Levitating',
        url: "https://soundcloud.com/dualipa/levitating"
    };
    public songURL: string = "https://soundcloud.com/dualipa/levitating";
    public options: any = [];
    public filteredOptions: any = [];
    public selectedOption: any;
    public selectedPlaylist = "recent";
    public allPlaylists: string[] = [];
    public showPlayer: boolean = false;

    constructor(
        private playlistsService: PlaylistsService,
        private filterService: FilterService,
        private alertController: AlertController
    ) {
    }

    public play() {
        if (this.playerComponent) {
            this.playerComponent.play();
        }
    }

    public addProgress() {
        if (this.progresoPistasComponent && this.progresoPistasComponent.progress <= 5) {
            this.progresoPistasComponent.addProgress();
            this.playerComponent!.availableSeconds = this.playerComponent!.availableSeconds * 2;
        }
    }

    ngOnInit(): void {
        this.allPlaylists = this.playlistsService.getPlaylistsNames();
        this.loadPlaylist(this.selectedPlaylist);
    }

    loadPlaylist(playlistName: string) {
        this.playlistsService.getPlaylist(playlistName).then((songs) => {
            this.options = songs.map((song: any, index: number) => {
                return {
                    id: index,
                    name: song.string,
                    url: song.url
                };
            });
            this.song = this.options[Math.floor(Math.random() * this.options.length)];
            this.songURL = this.song.url;
        });
    }

    onPlaylistChange(event: any) {
        this.loadPlaylist(this.selectedPlaylist);
        this.progresoPistasComponent?.setProgress(0);
        this.playerComponent!.availableSeconds = 2;
        this.showPlayer = false;
    }

    public resolver() {
        this.showPlayer = true;
        this.playerComponent!.availableSeconds = 300;
        this.play();
    }

    public async adivinar() {
        if (this.selectedOption.url === this.songURL) {
            const alert = await this.alertController.create({
                header: 'Correcto',
                message: 'Has acertado la canción',
                buttons: ['OK']
            });
            await alert.present();
            this.resolver();
        } else {
            if (this.progresoPistasComponent!.progress >= 5) {
                this.resolver();
            } else {
                this.addProgress();
            }
            const alert = await this.alertController.create({
                header: 'Incorrecto',
                message: 'Has fallado la canción',
                buttons: ['OK']
            });
            await alert.present();
        }
    }

    public search(event: any) {
        this.filteredOptions = [];
        let filtered = this.filterService.filter(
            this.options,
            ["name"],
            event.query,
            "contains"
        );
        for (let i = 0; i < filtered.length; i++) {
            let option = filtered[i];
            this.filteredOptions.push(option);
        }
    }

}
