<template>
  <div
    style="border-radius: 0.25rem; padding: 0.5rem; margin: 0.5rem 0.25rem"
    :style="{
      backgroundColor: bgColor
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  bgColor: {
    type: String,
    default: '#f4f4f4'
  }
})
</script>

<style scoped lang="scss"></style>
