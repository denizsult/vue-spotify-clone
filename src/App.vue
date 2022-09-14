<script setup>
import { inject, onMounted, ref, reactive, watch } from "vue";
import sidebar from "./components/sidebar.vue";
import Navbar from "./components/navbar.vue";
import bottomNavbar from "./components/bottomSection/bottomNavbar.vue";
import { useRoute,  onBeforeRouteUpdate} from "vue-router";
import store from "./store";

const spotify = inject("spotify");
const playlists = ref([]);
const appBody = ref();
const navbar = ref();
const route = useRoute();
const layout = ref(true);

const getPlaylists = async () => {
  playlists.value = (await spotify.getUserPlaylists()).items;
};

watch(
  route,
  (to) => {
    layout.value = to.meta.layout;
  },
  { flush: "pre", immediate: true, deep: true }
);

onBeforeRouteUpdate(async (to, from) => {
    console.log('spakdpşask');
  })


  store.dispatch('initilazeCode')
  store.dispatch("userData");

  /*   appBody.value?.addEventListener('scroll', (event) => {
    if(appBody?.scrollTop > 50){
      navbar.value.style.backgroundColor = "black"
    }else{
      navbar.value.style.backgroundColor = "transparent"
    }
  }) */

 

   getPlaylists();
</script>

<template>
  <div class="flex">
    <sidebar v-if="layout"  :playlists="playlists" class="h-screen static pt-5"></sidebar>
    <Navbar  v-if="layout" ref="navbar" />
    <router-view
      ref="appBody"
      class="bg-[#121212] pb-10 h-[95vh] overflow-x-hidden text-white relative"
    ></router-view>
    <bottomNavbar  v-if="layout" />
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
