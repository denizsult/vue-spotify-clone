<template>
  <div class="fixed bottom-0 bg-[#181818] w-screen h-20 px-4 flex justify-between">
    <div class="flex w-[120px] justify-start items-center gap-3">
      <template v-if="currentSong">
        <img
          :src="currentSong.album.images[2].url"
          :width="currentSong.album.images[2].width"
          :height="currentSong.album.images[2].height"
          alt="curretSongImage"
        />
        <div class="flex flex-col">
          <h3 class="text-white whitespace-nowrap text-sm">
            {{ currentSong.name }}
          </h3>
          <small class="text-white truncate text-[.7rem]">{{
            currentSong.artists[0].name
          }}</small>
        </div>
        <div class="ml-5"><heart-icon></heart-icon></div>
      </template>
    </div>

    <spotify-player
      :current-song="currentSong"
      :volume="volume"
      @setVolume="setVolume"
    />

    <div class="flex justify-center volume-container items-center mr-5">
      <input
        v-model="volume"
        @change="setVolumeSpotify"
        min="0"
        ref="volumeDOM"
        max="100"
        class="volume-setter"
        type="range"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from "@vue/runtime-core";
import store from "../../store";
import { heartIcon } from "../Icons";
import SpotifyPlayer from "./spotifyPlayer.vue";
const spotify = inject("spotify");
const volume = ref(0);
const volumeDOM = ref();
const volumeProgress = ref(0);


const currentSong = computed(() => store.getters.getSong??null);


const setVolume = (data) => {
  volumeDOM.value.value = data;
  volume.value = parseInt(data);
  volumeProgress.value = eval("0." + data);
};

const setVolumeSpotify = () => {
  spotify.setVolume(volume.value);
  setVolume(volume.value);
};



</script>



<style scoped>
.volume-setter {
  -webkit-appearance: none;
  -moz-apperance: none;
  border-radius: 30px;
  height: 4px;
  width: 100px;
  transition: all 1;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(v-bind(volumeProgress), #1db954),
    color-stop(v-bind(volumeProgress), #c5c5c5)
  );
}

.volume-setter::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  background-color: white;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  visibility: hidden;
}

.volume-container:hover .volume-setter::-webkit-slider-thumb {
  visibility: visible;
}
</style>
