<script setup>
import axios from "axios";
import { inject, onMounted, ref } from "vue";
import queryString from "query-string";
import sidebar from "./components/sidebar.vue";
import Navbar from "./components/navbar.vue";
import bottomNavbar from "./components/bottomSection/bottomNavbar.vue";
import router from "./router";
import store from "./store";

const spotify = inject("spotify");
const playlists = ref([]);
const appBody = ref()
const navbar = ref()
const getPlaylists = async () =>
  (playlists.value = (await spotify.getUserPlaylists()).items);



onMounted(async () => {
  store.dispatch('userData')

/*   appBody.value?.addEventListener('scroll', (event) => {
    if(appBody?.scrollTop > 50){
      navbar.value.style.backgroundColor = "black"
    }else{
      navbar.value.style.backgroundColor = "transparent"
    }
  }) */

  const params = new URLSearchParams(window.location.search);
  let code = params.get("code");

  let key = "86b1f2359e5c444f8366bc09e96232ab";
  let scrt = "fc0dae6751a74a84bd8163dd1dfa52bd";
  if (code) {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:3000/",
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
        localStorage.setItem("code", response.data.access_token);
        router.push("/");
      });
  
  }

  await getPlaylists();

});
</script>

<template>
  <div class="flex">
    <sidebar :playlists="playlists" class="h-screen static pt-5"></sidebar>
    <Navbar  ref="navbar"/>
    <router-view
      ref="appBody"
      class="bg-[#121212]  pb-10 h-[91vh] overflow-x-hidden text-white relative"
    ></router-view>
    <bottomNavbar></bottomNavbar>
  </div>
</template>

<style>
body {
  overflow: overlay;
  overflow-x: hidden !important;
}
/* width */
::-webkit-scrollbar {
  background: transparent !important;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
  max-height: 200px;
  height: 100px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}
</style>
