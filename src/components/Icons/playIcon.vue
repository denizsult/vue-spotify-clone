<template>
  <svg
    role="img"
    :height="height"
    :width="width"
    viewBox="0 0 16 16"
    :fill="fill"
    class="Svg-sc-1bi12j5-0 EQkJl"
  >
    <path
      d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"
    ></path>
  </svg>
</template>
<script setup>
  const props = defineProps({
    fill:{
      type: String,
      default: 'black'
    },
    height:{
      default:"16"
    },
    width:{
      default:"16"
    }
  })

</script>
 