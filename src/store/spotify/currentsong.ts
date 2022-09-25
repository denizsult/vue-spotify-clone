import spotify from '../../utils/spotify'


interface currentSongstate {
    song: {
        device: object,
        repeat_state: string,
        shuffle_state: string,
        context: object,
        timestamp: number,
        progress_ms: number,
        is_playing: boolean,
        item: object,
        currently_playing_type: string,
        actions: object
    }

}

export default {
    state: {
        song: null,
        lastTrack: null
    },

    mutations: {
        setSong(state: any, song: object) {
            state.song = song;
        },

    },
    getters: {
        getSong(state: any) {
            return state.song
        },


    },

    actions: {
        async getCurrentSongFromSpotify({ commit }: any) {
            let currentSong = (await spotify.getMyCurrentPlayingTrack())?.item
            let playedLastSong = (await spotify.getMyRecentlyPlayedTracks()).items[0].track

            commit('setSong', currentSong ?? playedLastSong)
        },

    }
}