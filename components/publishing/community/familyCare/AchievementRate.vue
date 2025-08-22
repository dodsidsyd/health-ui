<template>
  <div class="achievement-rate">
    <div class="achievement-tit">
      <div class="tit">달성률</div>
      <p class="rate-steps">{{ stepsText || '0/0' }}</p>
    </div>
    <div class="achievement-rate-bar">
      <i class="current-rate" :style="{ '--target-width': currentWidth + '%' }"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  targetWidth?: number
  stepsText?: string
}

const props = withDefaults(defineProps<Props>(), {
  targetWidth: 0,
  stepsText: '0/0'
})

// targetWidth가 유효한 숫자인지 확인하고 기본값 처리
const currentWidth = computed(() => {
  const width = Number(props.targetWidth)
  if (isNaN(width)) return 0
  return Math.min(100, Math.max(0, width)) // 0-100 범위로 제한
})
</script>

<style lang="scss" scoped>
.achievement-rate {
  margin-top: 2.4rem;
  .achievement-tit {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 1.6rem;
    color: #2b2b2b;
    font-weight: 700;
    margin-bottom: 1.2rem;
  }
  .achievement-rate-bar {
    border-radius: 6.8rem;
    height: 0.6rem;
    position: relative;
    overflow: hidden;
    background-color: #ececec;
    .current-rate {
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 6.8rem;
      background-color: vars.$blue-primary;
      animation: fill-bar 1s ease-in forwards;
    }
    @keyframes fill-bar {
      from {
        width: 0%;
      }
      to {
        width: var(--target-width);
      }
    }
  }
}
</style>
