<template>
  <div>
    <div ref="backgroundColorContainer" class="backgroundColor"></div>
    <div class="bg-gradiant"></div>
    <div class="h-72 flex flex-col px-8 gap-5 pt-20 relative">
      <h1 class="text-[2rem] font-bold">Tünaydın</h1>
      
      
      <div class="flex justify-between gap-1" v-if="playlists">
        <basic-playlist-card
          v-for="playlist in playlists?.slice(0, 3)"
          :key="playlist"
          :playlist="playlist"
          @setBackgroundColor="setBackgroundColor"
        />
      </div>
      <div class="flex justify-between gap-1">
        <basic-playlist-card
          v-for="playlist in playlists?.slice(3, 6)"
          :key="playlist"
          :playlist="playlist"
          @setBackgroundColor="setBackgroundColor"
        />
      </div>
    </div>




    <div class="px-8 mt-20">
      <div class="flex justify-between text-gray-300 mb-5">
        <h1 class="text-[1.4rem] font-bold">Son Dinlediklerinize Dayanarak</h1>
        <h3 class="text-sm tracking-wider">HEPSİNİ GÖR</h3>
      </div>
      <div class="flex gap-5">
        <playlist-card
          v-for="playlist in featuredPlaylists?.slice(0, 5)"
          :key="playlist?.id"
          :playlist="playlist"
        />
      </div>
    </div>
    <div class="px-8 mt-5">
      <div class="flex justify-between text-gray-300 mb-5">
        <h1 class="text-[1.4rem] font-bold">Son Dinlediklerinize Dayanarak</h1>
        <h3 class="text-sm tracking-wider">HEPSİNİ GÖR</h3>
      </div>
      <div class="flex gap-5">
        <playlist-card
        v-for="playlist in featuredPlaylists?.slice(0, 5)"
          :key="playlist?.id"
          :playlist="playlist"
        />
      </div>
    </div>
    <div class="px-8 mt-5">
      <div class="flex justify-between text-gray-300 mb-5">
        <h1 class="text-[1.4rem] font-bold">Son Dinlediklerinize Dayanarak</h1>
        <h3 class="text-sm tracking-wider">HEPSİNİ GÖR</h3>
      </div>
      <div class="flex gap-5">
        <playlist-card
        v-for="playlist in featuredPlaylists?.slice(0, 5)"
          :key="playlist?.id"
          :playlist="playlist"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import basicPlaylistCard from "./elements/basicPlaylistCard.vue";
import playlistCard from "./elements/playlistCard.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import spotify from "../utils/spotify";
import store from "../store";
const playlists = computed(() => store.getters.playlistItems);
const featuredPlaylists = ref();
const backgroundColor = ref([18, 18, 18]);
const backgroundColorContainer = ref();

const setBackgroundColor = (data: []) => {
  backgroundColorContainer.value.classList.remove("active");
  backgroundColorContainer.value.classList.add("active");
  backgroundColor.value = data;
};

const getFeaturedPlaylists = async () =>
  (featuredPlaylists.value = (
    await spotify.getFeaturedPlaylists()
  ).playlists?.items);
onMounted(async () => {
  getFeaturedPlaylists();
});



</script>

<style scoped>
.backgroundColor {
  width: 100%;
  height: 20rem;
  top: 0;
  position: absolute;
  transition: all 0.2s ease-out;
  background-color: rgb(
    v-bind(backgroundColor[0]),
    v-bind(backgroundColor[1]),
    v-bind(backgroundColor[2])
  );
}

.bg-gradiant {
  width: 100%;
  height: 20rem;
  position: absolute;
  background: linear-gradient(
    0deg,
    rgba(18, 18, 18, 1) 0%,
    rgba(18, 18, 18, 0) 100%
  );
}
</style>
