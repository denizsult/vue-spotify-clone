<template>
  <div
    v-if="currentSong"
    class="fixed bottom-0 bg-[#181818] w-screen h-24 flex justify-between px-5"
  >
    <div class="flex w-[300px] justify-start items-center gap-3">
      <img
        :src="currentSong.album.images[2].url"
        :width="currentSong.album.images[2].width"
        :height="currentSong.album.images[2].height"
        alt=""
      />
      <div class="flex flex-col">
        <h3 class="text-white whitespace-nowrap text-sm">
          {{ currentSong.name }}
        </h3>
        <small class="text-white text-xs">{{
          currentSong.artists[0].name
        }}</small>
      </div>
      <div class="ml-5"><heart-icon></heart-icon></div>
    </div>

    <spotify-player
      :current-song="currentSong"
      :volume="volume"
      @changeCurrentSong="getCurrentSong()"
      @setVolume="setVolume"
    />

    <div class="flex justify-center items-center">
      <input
        v-model="volume"
        @change="setVolumeSpotify"
        min="0"
        ref="volumeDOM"
        max="100"
        class="styled-slider"
        type="range"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "@vue/runtime-core";
import heartIcon from "../Icons/heartIcon.vue";
import SpotifyPlayer from "./spotifyPlayer.vue";
const spotify = inject("spotify");
const currentSong = ref(null);
const volume = ref(0);
const volumeDOM = ref();
let volumeProgress = ref(0);

const getCurrentSong = async () => {
  currentSong.value = (await spotify.getMyCurrentPlayingTrack())?.item;
};

const setVolume = (data) => {
  volumeDOM.value.value = data;
  volume.value = parseInt(data);
  volumeProgress.value = eval("0." + data);
};

const setVolumeSpotify = () => {
  spotify.setVolume(volume.value);    
  setVolume(volume.value);

};

onMounted(async () => {
  await getCurrentSong();
});
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  -moz-apperance: none;
  border-radius: 6px;
  height: 6px;
  transition: all 1;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(v-bind(volumeProgress), #1db954),
    color-stop(v-bind(volumeProgress), #c5c5c5)
  );
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  background-color: white;
  border-radius: 50%;
  height: 15px;
  width: 15px;
}
</style>
