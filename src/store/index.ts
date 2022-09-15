import { createStore } from "vuex";
import spotify from "../utils/spotify";
import router from "../router";
////////////////////////////////////////////////////
import playlist from "./spotify/playlist";
import currentsong from "./spotify/currentsong";
////////////////////////////////////////////////////

const store = createStore({
    state: {
        user: {},
     },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
       



    },
    getters: {
        getUser(state) {
            return state.user;
        },

       
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
        currentsong
    }
});





export default store;