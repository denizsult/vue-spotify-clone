<template>
    <bodyVue class="w-screen"></bodyVue>
</template>

<script lang="ts" setup>
import bodyVue from "../components/body.vue";
import store from "../store";
store.dispatch('currentSong')
</script>