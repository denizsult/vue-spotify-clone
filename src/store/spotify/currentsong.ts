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

    lastTrack: {
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
        song: {},
        lastTrack: {}
    },

    mutations: {
        setSong(state: any, song: object) {
            state.song = song;
        },
        setLastTrack(state: any, lastTrack: object) {
            state.lastTrack = lastTrack;
        }
    },
    getters: {
        getSong(state: any) {
            return state.song
        },

        getLastTrack(state:any) {
            return state.lastTrack;
        }
    },

    actions: {
        async getCurrentSongFromSpotify({ commit }: any) {
            commit('setSong', (await spotify.getMyCurrentPlayingTrack())?.item)
        },
        async getLastSongFromSpotify({ commit }: any) {
            commit('setLastTrack', (await spotify.getMyRecentlyPlayedTracks()).items[0].track)
        }
    }
}