<template>
  <section class="lottery-reward-wrap">
    <slot></slot>
  </section>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.lottery-reward-wrap {
  display: flex;
  flex-direction: column;
  margin: 0 -2rem;
  padding: 0 2rem;
  padding-bottom: 4.8rem;
  background: #eef2fb;
  border-radius: 2rem;
}
</style>
