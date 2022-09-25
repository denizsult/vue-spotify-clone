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
        layout: false,
        isToastActive: false,
        toastText: ''
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setLayout(state, layout) {
            state.layout = layout
        },

        setToastActiveStatus(state, isActive) {
            state.isToastActive = isActive
        },
        setToastText(state, text) {
            state.toastText = text
        }
        

    },
    getters: {
        getUser(state) {
            return state.user;
        },

        getLayout(state) {
            return state.layout
        },

        getToastStatus(state) {
            return state.isToastActive
        },

        getToastText(state) {
            return state.toastText
        },

    },

    actions: {
        async getUserFromSpotify({ commit }) {
            spotify.getMe().then((response) => {
                console.log(response);
                commit('setUser', response)
            }).catch(() => { localStorage.setItem('token', ''); router.push('/login') })
        },

        clearToast({state}){
            state.isToastActive = false,
            state.toastText = '';
        }
    },

    modules: {
        playlist,
        currentsong,
        player
    }
});





export default store;