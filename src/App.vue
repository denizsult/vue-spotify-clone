<script setup>
import { computed, provide, ref, watch } from "@vue/runtime-core";
import sidebar from "./components/sidebar.vue";
import Navbar from "./components/navbar.vue";
import bottomNavbar from "./components/bottomSection/bottomNavbar.vue";
import store from "./store";
const layout = computed(() => store.getters.getLayout);
const isToastActive = computed(()=> store.getters.getToastStatus) 
const toastText =  computed(()=> store.getters.getToastText) 

const changeNavbarBackgrounOnScroll = (e) => {
  let navbar = document.getElementById("navbar");
  let position = e.target.scrollTop;
  if (position > 50) {
    navbar.style.backgroundColor = "black";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
};
 
watch(
  () => isToastActive.value,
  () => {
    if (isToastActive.value) {
      setTimeout(() => {
        store.dispatch('clearToast')
      }, 2000);
    }
  }
);
</script>

<template>
  <div class="flex">
    <sidebar v-if="layout" class="h-screen static pt-5" />
    <Navbar id="navbar" v-if="layout" />
    <router-view
      @scroll="changeNavbarBackgrounOnScroll"
      class="bg-[#121212] pb-20 h-[95vh] overflow-x-hidden text-white relative"
    />
    <bottomNavbar v-if="layout" />
    <Transition>
      <div
        v-if="isToastActive"
        class="absolute bottom-24 right-20 w-72 h-16 bg-green-600 rounded-md text-white flex items-center px-5 font-semibold"
      >
        {{toastText}}
      </div>
    </Transition>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
