<template>
  <svg
    role="img"
    :height="height"
    :width="width"
    aria-hidden="true"
    viewBox="0 0 16 16"
    class="Svg-sc-1bi12j5-0 EQkJl"
    :fill="active ? 'white' : '' || liked ? '#1db954' : ''"
  >
    <path
      :stroke="!liked ? 'white' : ''"
      d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"
    ></path>
  </svg>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },

  liked: {
    type: Boolean,
    default: false,
  },
  width: {
    default: "16",
  },
  height: {
    default: "16",
  },
});
</script>
