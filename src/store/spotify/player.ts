import spotify from '../../utils/spotify';


const player = {
    state: {
        is_playing:false,
        is_shuffle:'',
        is_repeat:'',
        progress_ms:0,
        track:{},
        currently_playing_type:'',
    },
    mutations: {
       setPlayStatus(state:any, is_playing:any){
        state.is_playing = is_playing
       }
    },
    getters: {
        
    },

    actions: {
        async getPlayerFromSpotify({commit}:any){
            let player = await spotify.getMyCurrentPlaybackState();
             commit('setPlayStatus', player.is_playing);


            


        }
        
    }

}

export default player;