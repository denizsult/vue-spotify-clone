import spotify from '../../utils/spotify';
 interface Playlist {
    href:string,
    items:[],
    limit:number,
    next:string,
    offset:number,
    previous:string,
    total:number
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

        playlistItems(state:any){
            return state.playlist.items;
        }
    },

    actions: {
        async getPlaylistsFromSpotify({ commit }) {
            commit('setPlaylist', await spotify.getUserPlaylists())
        }
    }

}

export default playlist;