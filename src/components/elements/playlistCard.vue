<template>
  <div
    class="flex flex-col h-72 p w-52 gap-2 p-5  rounded-md bg-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.2)]"
  >
    <div class="h-48 w-full">
      <img class="object-cover h-full w-full rounded-md" :src="playlist?.images[0].url" alt="" />
    </div>
    <div class="font-semibold text-[.9rem]">{{ playlist.name ?? "" }}</div>
    <div class="text-[.80rem] text-[#b3b3b3]">{{ playlist.description }}</div>
  </div>
</template>

<script setup>
const props = defineProps(["playlist"]);
</script>
