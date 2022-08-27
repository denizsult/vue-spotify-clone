import { createApp,  } from 'vue'
import App from './App.vue'
import '../index.css'
import store from './store'
import router from './router'
import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();
spotify.setAccessToken(localStorage.getItem("code"));

const app = createApp(App);

app.provide('spotify', spotify);
app.use(store);
app.use(router);
app.mount('#app');
