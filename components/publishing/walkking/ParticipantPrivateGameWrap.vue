<template>
  <div class="participant-game-wrap">
    <div v-if="hasTitle" class="title-box">
      <p>참가자</p>
      <div class="number-box">{{ participants }}</div>
    </div>
    <div class="participant-box">
      <slot name="default"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  hasTitle: { type: Boolean, default: true },
  participants: {
    type: Number,
    default: 0
  }
})
</script>
<style lang="scss" scoped>
.participant-game-wrap {
  .title-box {
    display: flex;
    margin-bottom: 0.6rem;
    align-items: center;
    p {
      margin-right: 0.8rem;
      font-weight: 500;
      line-height: 2.5rem;
    }
  }
  .number-box {
    font-size: 18px;
    font-weight: 500;
    line-height: 2.5rem;
    color: var(--blue-primary);
  }
}
.participant-box {
  display: flex;
  flex-direction: column;
}
</style>
