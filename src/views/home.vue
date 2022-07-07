<template>
  <div class="flex">
    <sidebar :playlists="playlists" class="h-screen static pt-5"></sidebar>
    <bodyVue class="h-screen w-full"></bodyVue>
    <bottomNavbar></bottomNavbar>
  </div>
</template>

<script lang="ts" setup>
import sidebar from "../components/sidebar.vue";
import bodyVue from "../components/body.vue";
import bottomNavbar from "../components/bottomNavbar.vue";
import SpotifyWebApi from "spotify-web-api-js";
import { computed, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
import router from "../router";
import store from "../store";

const playlists = ref();
const spotify = new SpotifyWebApi();
const user:any = computed(() => {return store.getters.user;})


onMounted(async () => {
await axios("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("code"),
      },
    }).then((response) => {
      store.commit("setUser", response.data);
    }).catch((error) => {
      localStorage.removeItem("code");
      router.push("/login");
    }); 

  spotify.setAccessToken(localStorage.getItem("code"));
  spotify.getUserPlaylists(user.id).then((response) => {
    playlists.value = response.items;   
  });
});
</script>

<style></style>
