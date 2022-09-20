<template>
  <div
    class="flex flex-col h-72 p w-52 gap-2 p-5 cursor-pointer rounded-md bg-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.2)]"
    @click="goPlaylist"
  >
    <div class="flex justify-center items-center h-[10rem] w-[10rem]">
      <img
        class="object-cover rounded-md"
        :src="playlist?.images[0].url"
        alt=""
      />
    </div>
    <div class="font-semibold truncate text-[.8rem] w-40">{{ playlist.name ?? "" }}</div>
    <div class="text-[.80rem] text-[#b3b3b3]">{{ playlist.description }}</div>
  </div>
</template>

<script setup>
import router from "../../router";
const props = defineProps(["playlist"]);
const goPlaylist = () => router.push({name:"playlist", params: { id: props.playlist.id }});
</script>
