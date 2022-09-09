<template>
    <bodyVue class="w-screen"></bodyVue>
</template>

<script lang="ts" setup>

import bodyVue from "../components/body.vue";
import { computed, onMounted, ref, inject } from "@vue/runtime-core";
import store from "../store";

 

store.dispatch('currentSong')







</script>

<style>


</style>
