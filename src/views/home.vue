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
import bottomNavbar from "../components/bottomSection/bottomNavbar.vue";
import { computed, onMounted, ref, inject } from "@vue/runtime-core";
import store from "../store";
const spotify = inject("spotify");

const playlists = ref();

const user: any = computed(() => {
  return store.getters.user;
});

onMounted(async () => {
  await getUser();
  await getPlaylists();
});


const getUser = async () => store.commit("setUser", await spotify.getMe());
const getPlaylists = async () =>
  (playlists.value = (await spotify.getUserPlaylists()).items);
</script>

<style></style>
