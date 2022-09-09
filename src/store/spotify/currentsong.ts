import { inject } from "vue";
import spotify from '../../utils/spotify'

export default {
    state: {
        song: null,

    },
    mutations: {
        setSong(state:any, song:object){
            state.song = song;
        }

    },
    getters: {
        getSong(state){
            return state.song
        }
    },

    actions:{
        async currentSong({ commit }){
            commit('setSong', (await spotify.getMyCurrentPlayingTrack())?.item)
        }
    }
}