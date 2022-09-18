import { createStore } from "vuex";
import spotify from "../utils/spotify";
import router from "../router";
////////////////////////////////////////////////////
import playlist from "./spotify/playlist";
import currentsong from "./spotify/currentsong";
import player from "./spotify/player";
////////////////////////////////////////////////////

const store = createStore({
    state: {
        user: {},
        layout: false
     },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setLayout(state, layout){
            state.layout = layout
        }
       

    },
    getters: {
        getUser(state) {
            return state.user;
        },

        getLayout(state){
            return state.layout
        }
       
    },

    actions: {
        async getUserFromSpotify({ commit }) {
            spotify.getMe().then((response) => {
                commit('setUser', response)
            }).catch(() => { localStorage.setItem('token', ''); router.push('/login') })
        }
    },

    modules: {
        playlist,
        currentsong,
        player
    }
});





export default store;