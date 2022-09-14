import { createStore } from "vuex";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
import playlist from "./spotify/playlist";
import currentsong from "./spotify/currentsong";
import spotify from "../utils/spotify";
const store = createStore({
    state: {
        user: {},
        code: "",
    },
    mutations: {

        setUser(state, user) {
            state.user = user;
        },
        setCode(state, code) {
            state.code = code;
        },


    },
    getters: {

        user(state) {
            return state.user;
        },
        token(state) {
            return state.code;
        },

    },

    actions: {
        async userData({ commit }) {
            console.log('s');
            commit('setUser', await spotify.getMe())
        },

        async initilazeCode({ state }) {
            spotify.setAccessToken(state?.code??localStorage.getItem('code'))
        }
    },

    modules: {
        playlist,
        currentsong
    },

    plugins: [
        store => {
            store.subscribe((mutation, state) => {
                ls.set("user", state.user);
                ls.set("code", state.code);
            });
        }]
});





export default store;