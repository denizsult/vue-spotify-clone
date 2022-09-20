<script setup>
import { computed, ref } from "vue";
import sidebar from "./components/sidebar.vue";
import Navbar from "./components/navbar.vue";
import bottomNavbar from "./components/bottomSection/bottomNavbar.vue";
import store from "./store";
const layout = computed(() => store.getters.getLayout);

const changeNavbarBackgrounOnScroll = (e) => {
  let navbar = document.getElementById("navbar");
  let position = e.target.scrollTop;
  if (position > 50) {
    navbar.style.backgroundColor = "black";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
};

</script>

<template>
  <div class="flex">
    <sidebar v-if="layout" class="h-screen static pt-5" />
    <Navbar id="navbar" v-if="layout" />
    <router-view
      @scroll="changeNavbarBackgrounOnScroll"
      class="bg-[#121212] pb-10 h-[95vh] overflow-x-hidden text-white relative"
    />
    <bottomNavbar v-if="layout" />
  </div>
</template>
