<script setup>
import { inject, onMounted, ref } from "vue";
import sidebar from "./components/sidebar.vue";
import Navbar from "./components/navbar.vue";
import bottomNavbar from "./components/bottomSection/bottomNavbar.vue";
import store from "./store";
import router from "./router";
import axios from "axios";
import queryString from "query-string";

const spotify = inject("spotify");
const appBody = ref();
const navbar = ref();
const layout = ref(true);

const initilazeStore = () => {
  store.dispatch("getUserFromSpotify");
  store.dispatch("getPlaylistsFromSpotify");
  store.dispatch("getCurrentSongFromSpotify");
};

router.beforeEach(async (to, from, next) => {
  layout.value = to.meta.layout;
  const params = new URLSearchParams(window.location.search);
  let requestCode = params.get("code");
  let key = "86b1f2359e5c444f8366bc09e96232ab";
  let scrt = "fc0dae6751a74a84bd8163dd1dfa52bd";
  if (requestCode && !localStorage.getItem("token") ) {
    await axios
      .post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
          grant_type: "authorization_code",
          code: requestCode,
          redirect_uri:window.location.origin + '/',
          client_id: key,
          client_secret: scrt,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(async (response) => {
        localStorage.setItem("token", response.data.access_token);
        spotify.setAccessToken(response.data.access_token);
        initilazeStore();
      });
  }

  let token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.isPublic)) {
    if (token) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    if (token) {
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }
});

/*   appBody.value?.addEventListener('scroll', (event) => {
    if(appBody?.scrollTop > 50){
      navbar.value.style.backgroundColor = "black"
    }else{
      navbar.value.style.backgroundColor = "transparent"
    }
  }) */

onMounted(async () => {
  if ( localStorage.getItem("token")) {
    initilazeStore();
  }
});
</script>

<template>
  <div class="flex">
    <sidebar v-if="layout" class="h-screen static pt-5"></sidebar>
    <Navbar v-if="layout" ref="navbar" />
    <router-view
      ref="appBody"
      class="bg-[#121212] pb-10 h-[95vh] overflow-x-hidden text-white relative"
    ></router-view>
    <bottomNavbar v-if="layout" />
  </div>
</template>

<style>
body {
  overflow: overlay;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: white;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: red;
}
</style>
