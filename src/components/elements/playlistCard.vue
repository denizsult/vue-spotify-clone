<template>
  <div
    class="flex flex-col h-72 p w-52 gap-2 p-5 cursor-pointer rounded-md bg-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.2)]"
    @click="goPlaylist"
  >
    <div class="h-48 w-full">
      <img
        class="object-cover h-full w-full rounded-md"
        :src="playlist?.images[0].url"
        width="100"
        height="100"
        alt=""
      />
    </div>
    <div class="font-semibold text-[.9rem]">{{ playlist.name ?? "" }}</div>
    <div class="text-[.80rem] text-[#b3b3b3]">{{ playlist.description }}</div>
  </div>
</template>

<script setup>
import router from "../../router";

const props = defineProps(["playlist"]);

const goPlaylist = () => router.push({name:"playlist", params: { id: props.playlist.id }});
</script>
