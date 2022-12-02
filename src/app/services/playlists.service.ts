import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PlaylistsService {

    private playListNames: string[] = [
        "2000esp",
        "asturianu",
        "boda",
        "caribemix",
        "default",
        "imagine_dragons",
        "movingchiquilinas",
        "playlistjulia",
        "recent",
        "top50esp"
    ];

    public getPlaylistsNames(): string[] {
        return this.playListNames;
    }

    /**
     * Get the list of songs from a playlist
     *
     * @returns {Promise<{string: string, url: string}[]>}
     */
    public getPlaylist(playlistName: string): Promise<{name: string, url: string}[]> {
        return new Promise((resolve, reject) => {
            fetch(`https://raw.githubusercontent.com/OpenHeardle/heardle/main/songs/lists_json/${playlistName}.json`)
                .then(response => response.json())
                .then(json => {
                    const songs = json.sort(() => 0.5 - Math.random());
                    resolve(songs);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
