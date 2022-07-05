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
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";

const playlists = ref([]);

onMounted(async () => {
  const me = (
    await axios("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("code"),
      },
    })
  ).data;

  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(localStorage.getItem("code"));
  spotify.getUserPlaylists(me.id).then((response) => {
    playlists.value = response.items;   
  });
});
</script>

<style></style>
