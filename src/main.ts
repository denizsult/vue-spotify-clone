import { createApp,  } from 'vue'
import App from './App.vue'
import '../index.css'
import store from './store'
import router from './router'
import spotify from './utils/spotify'

const app = createApp(App);

app.provide('spotify', spotify);
app.use(store);
app.use(router);
app.mount('#app');
