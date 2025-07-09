<template>
  <div class="challenge-history-wrap">
    <div class="date-box">
      <p>{{ date }}</p>
    </div>
    <div class="challenge-box">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  date: { type: String, default: '' }
})
</script>
<style scoped lang="scss">
.challenge-history-wrap {
  padding-bottom: 4rem;
}
.date-box {
  position: relative;
  padding-left: 2.8rem;
  margin-bottom: 1.6rem;
  &:before {
    content: '';
    position: absolute;
    left: 0.8rem;
    top: 0.6rem;
    width: 1.2rem;
    height: 1.2rem;
    background-color: #fefefe;
    border: 0.3rem solid #2b2b2b;
    border-radius: 50%;
  }
  p {
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.8rem;
  }
}
.challenge-box {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
