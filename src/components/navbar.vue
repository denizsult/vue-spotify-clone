<template>
  <div class="sticky w-full h-16 bg-[rgba(0,0,0,.5)]">
    <div class="flex items-center justify-between h-full bg-[#121212] px-7">
      <div class="flex gap-5 items-center">
        <div class="flex gap-5">
          <left-arrow-icon />
          <right-arrow-icon />
        </div>

        <div class="flex h-10 w-[370px] bg-white text-black rounded-[50px]">
          <div class="px-2 flex items-center ">
            <search-icon type="black" />
          </div>
          <input
            class="outline-none rounded-[50px] w-full"
            placeholder="Sanatçılar, şarkılar veya podcast'ler"
            type="text"
          />
        </div>
      </div>
<!-- 
      <div class="flex items-center gap-9 font-semibold">
        <a href="" class="text-[#a7a7a7]"> Kaydol</a>
        <button class="bg-white rounded-[50px]  p-3">Oturum aç</button>

      </div> -->

      <div class="flex gap-2 justify-center items-center bg-black rounded-[50px] text-white  text-sm pr-3 hover:bg-[#282828] cursor-pointer">
           <img class="bg-white rounded-[100px] object-cover w-7" :src="user.images ? user.images[0].url : ''" alt=""> 
          <span class="text-white truncate w-[102px]">{{user.display_name}}</span> 
          <triangleIcon />        
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
const user = computed(() => {return store.getters.user;})

</script>

<style></style>
