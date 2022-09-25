import spotify from '../../utils/spotify';
interface Playlist {
    href: string,
    items: [],
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number
}

const playlist = {
    state: {
        playlist: {},
        tracks: {},

    },
    mutations: {
        setPlaylist(state: any, playlist: Playlist) {
            state.playlist = playlist;
        }
    },
    getters: {
        playlist(state: any) {
            return state.playlist;
        },

        playlistItems(state: any) {
            return state.playlist.items;
        }
    },

    actions: {
        async getPlaylistsFromSpotify({ commit }: any) {
            commit('setPlaylist', await spotify.getUserPlaylists())
        },


        async createPlaylist() {
            let playlistNumbers: number[] = []
            let user = this.getters.getUser;
            let rg = /[1-9].{2}/g 
            this.getters.playlistItems.filter((item: any) => rg.test(item.name) &&  playlistNumbers.push(parseInt(item.name.replace('.', ''))))
            playlistNumbers.sort(function (a, b) { return b - a });
            if(user){
                await spotify.createPlaylist(user.id, {
                    name: `${playlistNumbers[0] + 1}. Çalma Listem`
                });
                this.dispatch('getPlaylistsFromSpotify')  
                this.commit("setToastActiveStatus", true);
                this.commit("setToastText", "Çalma Listesi Oluşturuldu.");
            }
        },

        async addSongToSelectedPlaylist({commit}, data){
            spotify.addTracksToPlaylist(data.playlist.id, [data.songId])
            
        }
    }
}

export default playlist;