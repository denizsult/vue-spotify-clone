<template>
  <div
    class="flex items-center rounded-md gap-4 h-[75px] w-[22rem] bg-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.2)] cursor-pointer"
    @mouseenter="setBackgroundColor"
  >
    <div class="h-full w-20 rounded-sm ">
      <img ref="playlistImage" crossorigin="anonymous" class="object-cover h-full w-full" :src="img" alt="">
    </div>

    <div class="w-72">{{name}}</div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import ColorThief from 'colorthief'
const props = defineProps(['name', 'img', 'link'])
const playlistImage = ref();
const colorThief = new ColorThief();
const emit = defineEmits()

const setBackgroundColor = () => {
  let backgroundColor = colorThief.getColor(playlistImage.value)
  emit('setBackgroundColor', backgroundColor)
}
</script>

<style></style>
