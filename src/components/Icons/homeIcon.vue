<template>
  <svg
    role="img"
    height="24"
    width="24"
    class="Svg-sc-1bi12j5-0 EQkJl home-active-icon"
    viewBox="0 0 24 24"
  >
    <path
      d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"
      stroke="white"
      :fill="props.active ? 'white' : ''"
    ></path>
  </svg>
</template>

<script lang="ts" setup>

const props = defineProps({
  active: {
    type: Boolean,
    default: true
  }
});

</script>

