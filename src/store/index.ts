import { createStore } from "vuex";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
import playlist from "./spotify/playlist";
import currentsong from "./spotify/currentsong";
import spotify from "../utils/spotify";
const store = createStore({
    state: {
        isAuthenticated: false,
        user: {},
        token: "",
        error: "",
 
    },
    mutations: {
        setIsAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        setUser(state, user) {  
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
        setError(state, error) {
            state.error = error;
        },
       
    },
    getters:{
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        user(state) {
            return state.user;
        },
        token(state) {
            return state.token;
        },
        error(state) {
            return state.error;
        },
    },

    actions:{
        async userData({commit}){
            commit('setUser', await spotify.getMe())
        }
    },

    modules:{
        playlist,
        currentsong
    },  
     
    plugins: [
        store => {
            store.subscribe((mutation, state) => {
                ls.set("isAuthenticated", state.isAuthenticated);
                ls.set("user", state.user);
                ls.set("token", state.token);
                ls.set("error", state.error);
            });
        }]
});





export default store;