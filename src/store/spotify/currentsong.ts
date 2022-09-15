import spotify from '../../utils/spotify'


interface currentSongstate {
    song:{
        device:object,
        repeat_state:string,
        shuffle_state:string,
        context:object,
        timestamp:number,
        progress_ms:number,
        is_playing:boolean,
        item:object,
        currently_playing_type:string,
        actions:object
    }
}

export default {
    state: {
        song: {},
    },
    mutations: {
        setSong(state:any, song:object){
            state.song = song;
        }
    },
    getters: {
        getSong(state:any){
            return state.song
        },
        
        getSongItem(state:currentSongstate ){
            return state.song?.item;
        }
    },

    actions:{
        async getCurrentSongFromSpotify({ commit }:any){
            commit('setSong', (await spotify.getMyCurrentPlayingTrack())?.item)
        }
    }
}