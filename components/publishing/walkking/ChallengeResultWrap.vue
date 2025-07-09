<template>
  <div class="challenge-result-wrap">
    <slot></slot>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.challenge-result-wrap {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  margin-top: 3.2rem;
  padding: 2.4rem 1.65rem 1.6rem;
  background: #dbe5fd;
  border-radius: 2rem;
}
</style>
