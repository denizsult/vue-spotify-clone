<template>
  <div
    id="sidebar"
    class="bg-black flex items-start justify-between flex-col gap-5 text-[#b3b3b3]"
  >
    <div class="flex flex-col gap-5">
      <div class="flex w-full justify-start px-6 mb-3">
        <logoVue />
      </div>

      <ul class="px-6">
        <li><home-icon /> Ana sayfa</li>
        <li><search-icon /> Ara</li>
        <li><library-icon /> Kitaplığın</li>
      </ul>
      <div class="flex flex-col px-6 gap-4">
        <a class="flex gap-4 items-center" href="">
          <div
            class="bg-gray-300 w-6 h-6 flex items-center justify-center rounded-sm"
          >
            <plus-icon />
          </div>
          Çalma Listesi Oluştur</a
        >
        <a class="flex gap-4 items-center" href="">
          <div
            class="bg-[linear-gradient(135deg,#450af5,#c4efd9)] w-6 h-6 flex items-center justify-center rounded-sm"
          >
            <heart-icon />
          </div>
          Beğenilen Şarkılar</a
        >
      </div>

      <div class="px-6 w-100">
        <hr class="bg-gray-900 text-gray-900 border border-gray-900" />
      </div>

      <div
        class="px-6 text-xs flex flex-col overflow-y-scroll gap-3 mb-12 h-80"
      >
        <div v-for="playlist in props.playlists" :key="playlist.id">
          <span
            ><a href="" class="truncate">{{ playlist.name }}</a></span
          >
        </div>
      </div>
    </div>

    <div class="px-6 text-xs flex flex-col gap-3 mb-12 hidden">
      <a href="">Çerezler</a>
      <a href="">Gizlilik</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logoVue from "./logo.vue";
import homeIcon from "./Icons/homeIcon.vue";
import searchIcon from "./Icons/searchIcon.vue";
import libraryIcon from "./Icons/libraryIcon.vue";
import plusIcon from "./Icons/plusIcon.vue";
import heartIcon from "./Icons/heartIcon.vue";
//playlist 30
 const props = defineProps({
  playlists: {
    type: Array,
    default: [],
  }})

</script>

<style>
#sidebar {
  width: 250px;
  min-width: 250px;
}
ul {
  list-style: none;
}
ul li {
  margin-bottom: 0.5em;
  display: flex;
  gap: 1rem;
  height: 30px;
}
</style>
