<template>
  <div class="sticky-profile-section">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.sticky-profile-section {
  position: sticky;
  top: 2.4rem;
  z-index: 10;
  margin: 0 -2rem;
  padding: 0 2rem;
  background-color: #fff;
}
</style>
