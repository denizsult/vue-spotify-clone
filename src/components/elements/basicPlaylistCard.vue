<template>
  <div
    class="flex items-center rounded-md gap-4 h-[75px] w-[22rem] bg-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.2)] cursor-pointer"
    @mouseenter="setBackgroundColor"
    @click="goPlaylist"
  >
    <div class="h-full w-20 rounded-l-lg">
      <img
        ref="playlistImage"
        crossorigin="anonymous"
        class="object-cover h-full w-full rounded-l-lg"
        :src="
          playlist?.images[0]?.url ?? 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'
        "
        alt=""
      />
    </div>

    <div class="w-72">{{ playlist.name }}</div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import ColorThief from "colorthief";
import router from "../../router";
const props = defineProps(["playlist"]);
const playlistImage = ref();
const colorThief = new ColorThief();
const emit = defineEmits();
const goPlaylist = () =>router.push({ name: "playlist", params: { id: props.playlist.id } });
const setBackgroundColor = () => {
  const backgroundColor = colorThief.getColor(playlistImage.value);
  emit("setBackgroundColor", backgroundColor);
};
</script>