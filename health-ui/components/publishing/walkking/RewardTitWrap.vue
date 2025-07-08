<template>
  <div class="reward-info-wrap">
    <span :class="{ mission: props.mission }">{{ badge }}</span>
    <h3>{{ title }}</h3>
    <p>{{ detail }}</p>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  badge: { type: String, default: '' },
  title: { type: String, default: '' },
  detail: { type: String, default: '' },
  mission: { type: Boolean, default: false }
})
</script>
<style lang="scss" scoped>
.reward-info-wrap {
  padding-top: 4.8rem;
  text-align: center;
  span {
    display: inline-block;
    padding: 0.8rem 1.6rem;
    background: #4c7ff7;
    border-radius: 48px;
    font-weight: 700;
    line-height: 2.2rem;
    color: #fff;
    &.mission {
      background: #8fc534;
    }
  }
  h3 {
    margin: 1.6rem 0 0.4rem;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.4rem;
  }
  p {
    color: #555;
  }
}
</style>
