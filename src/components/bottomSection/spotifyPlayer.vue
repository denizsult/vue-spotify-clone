<template>
  <div class="flex flex-1 justify-center">
    <div class="flex text-white mt-1 flex-col items-center">
      <div class="flex justify-center items-center gap-5 h-12 w-48">
        <div class="w-20" @click="changeShuffleState">
          <shuffle-icon class="hover:fill-white" :shuffleState="shuffleState" />
        </div>
        <div class="w-20" @click="store.dispatch('previousSong')">
          <skip-back-icon class="hover:fill-white" />
        </div>
        <div class="w-20">
          <button
            @click="
              isPlaying ? store.dispatch('pause') : store.dispatch('play')
            "
            class="playButton"
          >
          
            <play-icon v-if="!isPlaying" />
            <pause-icon v-else />
          </button>
        </div>
        <div class="w-20" @click="store.dispatch('nextSong')">
          <skip-forward-icon class="hover:fill-white" />
        </div>
        <div class="w-20" @click="changeRepeatState">
          <repeat-icon class="hover:fill-white" :repeatState="repeatState" />
        </div>
      </div>

      <div class="progress-container">
        <small class="text-[#a7a7a7] text-[0.65rem]">{{
          songDurationCounter
        }}</small>

        <div class="progressBar">
          <span class="progressTracker"></span>
        </div>

        <small class="text-[#a7a7a7] text-[0.65rem]">{{ songDuration }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, computed, watch } from "@vue/runtime-core";
import {
  skipBackIcon,
  skipForwardIcon,
  pauseIcon,
  playIcon,
  repeatIcon,
  shuffleIcon,
} from "../Icons";
import store from "../../store";
/* --------------------------------------------------- */
const songDurationCounter = ref("0:00");
const songDuration = ref("0:00");
const isPlaying = computed(() => store.getters.getPlayStatus);
const repeatState = computed(() => store.getters.getRepeatStatus);
const shuffleState = computed(() => store.getters.getShuffleStatus);
/* --------------------------------------------------- */
const emit = defineEmits();
const props = defineProps(["volume"]);
const spotify = inject("spotify");
const currentSong = computed(() => store.getters.getSong);
/* --------------------------------------------------- */

const playBack = async () => {
  let progressTracker = document.querySelector(".progressTracker");
  setInterval(async () => {
    let playbackData = await getPlaybackData();
    let volumeData = playbackData.device.volume_percent;
    let playbackTime = playbackData.progress_ms;
    let currentsongDuration = currentSong.value.duration_ms;
    songDurationCounter.value = millisToMinutesAndSeconds(playbackTime);
    isPlaying.value = playbackData.is_playing;
    repeatState.value = playbackData.repeat_state === "off" ? false : true;
    shuffleState.value = playbackData.shuffle_state;
    let progress = (playbackTime / currentsongDuration) * 100;
    progressTracker.style.width = `${progress}%`;

    if (progress === 100) {
      emit("changeCurrentSong");
    }
    if (currentSong.id != playbackData.item.id) {
      emit("changeCurrentSong");
    }
    emit("setVolume", volumeData);
  }, 1000);
};

watch(
  () => currentSong.value,
  () => {
    songDuration.value = millisToMinutesAndSeconds(
      currentSong.value?.duration_ms
    );
  }
);

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const changeShuffleState = () => {
  spotify.setShuffle(!shuffleState.value);
};
const changeRepeatState = () => {
  let state = !repeatState.value;
  spotify.setRepeat(state ? "context" : "off");
};

onMounted(() => {
  store.dispatch("getCurrentSongFromSpotify");
  store.dispatch("getPlayerFromSpotify");
  //playBack();
});
</script>

<style scoped>
.progress-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
  width: 540px;
}

.progressBar {
  background: gray;
  height: 3px;
  width: 100%;
  position: relative;
  color: white;
  display: flex;
  border-radius: 20px;
  margin: 0 0.5rem;
}

.progressTracker {
  background: white;
  height: 3px;
  width: 0;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
}

.playButton {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.playButton:active {
  width: 32px;
  height: 32px;
}
</style>
