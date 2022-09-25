import spotify from '../../utils/spotify';

 

const player = {
    state: {
        is_playing: false,
        is_shuffle: false,
        is_repeat: false,
        progress_ms: 0,
        track: {},
    },
    mutations: {
        setTrack(state: any, track: any) {
            state.track = track
        },
        setPlayStatus(state: any, is_playing: any) {
            state.is_playing = is_playing
        },

        setShuffleStatus(state: any, is_shuffle: any) {
            state.is_shuffle = is_shuffle
        },

        setRepeatStatus(state: any, is_repeat: any) {
            state.is_shuffle = is_repeat
        },

        setProgressMs(state: any, progress_ms: any) {
            state.progress_ms = progress_ms
        },


    },
    getters: {

        getTrack(state: any) {
            return state.track;
        },
        getPlayStatus(state: any) {
            return state.is_playing
        },

        getShuffleStatus(state: any) {
            return state.is_shuffle

        },
        getRepeatStatus(state: any) {
            return state.is_repeat
        },

        getProgressMs(state: any) {
            return state.progress_ms
        },


    },

    actions: {
        async getPlayerFromSpotify({commit}: any) {
            let player = await spotify.getMyCurrentPlaybackState();
            commit('setPlayStatus', player.is_playing);
            commit('setShuffleStatus', player.shuffle_state);
            commit('setRepeatStatus', player.repeat_state);
            commit('setProgressMs', player.progress_ms);
            this.dispatch('getCurrentSongFromSpotify')
        },

        async pause() {
            await spotify.pause();
            this.dispatch('getPlayerFromSpotify')
        },

        async play() {
            console.log(this);
            await spotify.play();
            this.dispatch('getPlayerFromSpotify')
        },

        async nextSong() {
            await spotify.skipToNext();
            this.dispatch('getPlayerFromSpotify')
        },

        async previousSong() {
            await spotify.skipToPrevious();
            this.dispatch('getPlayerFromSpotify')
        },

        async changeShuffleState(shuffleState: any) {
            spotify.setShuffle(!shuffleState.value);
            this.dispatch('getPlayerFromSpotify')

        },

        async changeRepeatState(repeatState: any) {
            let state = !repeatState.value;
            spotify.setRepeat(state ? "context" : "off");
            this.dispatch('getPlayerFromSpotify')

        }
    }
}
export default player;