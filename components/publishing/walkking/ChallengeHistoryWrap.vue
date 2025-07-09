<template>
  <div class="challenge-history-wrap">
    <slot></slot>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.challenge-history-wrap {
  position: relative;
  height: 100%;
  margin-top: 4.4rem;
  &::before {
    z-index: 0;
    content: '';
    position: absolute;
    top: 1rem;
    bottom: -1rem;
    left: 1.2rem;
    width: 0.4rem;
    height: 100%;
    background-color: #eeeeee;
  }
}
</style>
