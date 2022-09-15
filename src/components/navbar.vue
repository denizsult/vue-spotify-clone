<template>
  <div class="fixed left-[15rem] w-[83vw] h-16 navBar">
    <div class="flex items-center justify-between h-full px-7">
      <div class="flex gap-5 items-center">
        <div class="flex gap-5">
          <div class="p-1 rounded-[100%] bg-[rgba(18,18,18,0.8)]">
            <left-arrow-icon />
          </div>
          <div class="p-1 rounded-[100%] bg-[rgba(18,18,18,0.8)]">
            <right-arrow-icon />
          </div>
        </div>

        <div
          v-if="isSearch"
          class="flex h-10 w-[370px] bg-white text-black rounded-[50px]"
        >
          <div class="px-2 flex items-center">
            <search-icon type="black" />
          </div>
          <input
            class="outline-none rounded-[50px] w-full"
            placeholder="Sanatçılar, şarkılar veya podcast'ler"
            type="text"
          />
        </div>
      </div>

      <div
        class="flex justify-between items-center h-7 w-44 bg-black rounded-[50px] text-white text-sm hover:bg-[#282828] cursor-pointer"
      >
        <img
          class="bg-white rounded-[100px] object-cover w-7"
          :src="user.images ? user.images[0].url : ''"
          alt=""
        />
        <span class="text-white truncate w-[102px]">{{
          user.display_name
        }}</span>

        <triangleIcon class="mr-2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import searchIcon from "./Icons/searchIcon.vue";
import rightArrowIcon from "./Icons/rightArrowIcon.vue";
import leftArrowIcon from "./Icons/leftArrowIcon.vue";
import triangleIcon from "./Icons/triangleIcon.vue";
import store from "../store";
import { computed } from "@vue/runtime-core";
const user = computed(() => {
  return store.getters.getUser;
});

const props = defineProps({
  isSearch: {
    default: false,
  },
});
const background = props.isSearch ? "rgba(0,0,0,.5)" : "transparent";
</script>

<style scoped>
.navBar {
  z-index: 2;
  background: v-bind(background);
}
</style>
