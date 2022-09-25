<template>
  <bodyVue class="w-screen"></bodyVue>
</template>
<script lang="ts" setup>
import { onMounted } from "@vue/runtime-core";
import bodyVue from "../components/body.vue";
import store from "../store";

const initilazeStore = () => {
  store.dispatch("getPlaylistsFromSpotify");
  store.dispatch("getUserFromSpotify");
  store.dispatch("getCurrentSongFromSpotify");
};

onMounted(() => {
  initilazeStore();
});
</script>
