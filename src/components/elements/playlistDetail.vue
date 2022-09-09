<template>
  <div ref="backgroundColorContainer" class="backgroundColor"></div>
  <div class="bg-gradiant"></div>

  <div v-if="playlist" class="flex flex-col px-8 gap-10 pt-20 relative">
    <div class="flex gap-4">
      <img
        crossorigin="anonymous"
        ref="playlistImage"
        width="232"
        height="232"
        :src="playlist.images[0].url"
        alt=""
      />

      <div class="flex flex-col pt-9">
        <h6 class="text-xs font-semibold">ÇALMA LİSTESİ</h6>
        <h1 class="lg:text-[5rem] font-bold">{{ playlist.name }}</h1>
        <div v-if="playlist" class="flex flex-col mt-2">
          <h6 class="text-gray-300">{{ playlist.description }}</h6>
          <h6>
            {{ playlist.owner.display_name }} .
            {{ playlist.followers.total.toLocaleString() }} Beğenme .
            {{ playlist.tracks.total }} Şarkı
          </h6>
        </div>
      </div>
    </div>

    <div>dasojda</div>

    <div v-if="playlist" class="px-4">
      <table class="tracksTable">
        <thead>
          <th width="3%">#</th>
          <th>Başlık</th>
          <th>Albüm</th>
          <th>Tarih Eklendi</th>
          <th>Süre</th>
        </thead>

        <tbody>
          <tr
            v-for="(playlistItem, index) in playlist.tracks.items"
            :key="playlistItem.id"
            @mouseenter="playlistItem.hover = true"
            @mouseleave="playlistItem.hover = false"
            @click="playSong(playlistItem.track)"
            class="relative tableRow"
            :class="[playlistItem.active ? 'active' : '']"
          >
            <td>
              <span v-if="!playlistItem.hover">
                {{ index + 1 }}
              </span>
              <span v-else>
                <PlayIcon fill="white" />
              </span>
            </td>
            <td>
              <div class="flex gap-4">
                <img
                  width="40"
                  height="40"
                  :src="playlistItem.track?.album.images[0].url"
                  alt=""
                />
                <div class="flex flex-col w-40 justify-around">
                  <h4>{{ playlistItem.track?.name }}</h4>

                  <small> {{ playlistItem.track?.artists[0].name }}</small>
                </div>
              </div>
            </td>
            <td>
              {{ playlistItem.track?.album.name }}
            </td>

            <td>
              {{ calcDate(playlistItem.added_at) }}
            </td>

            <td>
              {{ millisToMinutesAndSeconds(playlistItem.track?.duration_ms) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, inject } from "@vue/runtime-core";
import router from "../../router";
import colorthief from "colorthief";
import playIcon from "../Icons/playIcon.vue";
import PlayIcon from "../Icons/playIcon.vue";
import store from "../../store";
////////////////////////////////////////////////////////////
const spotify = inject("spotify");
const colorThief = new colorthief();
const playlist = ref(null);
const playlistImage = ref();
const playlistID = router.currentRoute.value.params.id;
const backgroundColor = ref(18, 18, 18);
////////////////////////////////////////////////////////////
const getPlaylist = async () => {
  playlist.value = await spotify.getPlaylist(playlistID);
};

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var hours = Math.floor(minutes / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const calcDate = (date) => {
  const currentDate = Date.now();
  const diffTime = new Date(date).valueOf() - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.abs(diffDays) + " gün önce";
};

const playSong = async (song) => {
  await spotify.play({
    uris: [song.uri],
    offset: {
      position: 0,
    },
  });
  store.commit("setSong", song);
  setActiveSong();
};

const setActiveSong = () => {
  const currentSong = store.getters.getSong;
  const tracks = playlist.value.tracks.items;
  tracks.filter((item) =>
    item.track.id === currentSong.id
      ? (item.active = true)
      : (item.active = false)
  );
};

onMounted(async () => {
  await getPlaylist();
  setActiveSong();
  playlistImage.value.addEventListener("load", () => {
    backgroundColor.value = colorThief.getColor(playlistImage.value);
  });
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

.tracksTable {
  text-align: left;
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
}

.tracksTable thead {
  height: 70px;
}
.tracksTable thead th {
  color: #b3b3b3;
  font-weight: 300;
  padding: 0 1rem;
  letter-spacing: 2px;
}

.tracksTable tbody td {
  padding: 0 1rem;
}

.tracksTable tbody td h4 {
  color: white;
}

.tracksTable tbody td {
  color: #b3b3b3;
  font-weight: 400;
  height: 55px;
}

.tableRow::after {
  content: "";
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  background: hsla(0, 0%, 50%, 0.3);
}

.tableRow:hover::after {
  visibility: visible;
}

.tableRow.active::after {
  content: "";
  visibility: visible;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  background: hsla(0, 0%, 30%, 0.2);
}
.tableRow.active td h4 {
  color: #1db954 !important;
}
</style>
