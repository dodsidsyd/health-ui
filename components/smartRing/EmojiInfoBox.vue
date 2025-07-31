<template>
  <div class="emoji-info">
    <ul>
      <li v-for="(legend, index) in legendItems" :key="index">
        <i class="emoji" :class="legend.status"></i>
        <span>{{ legend.text }}</span>
        <span>{{ legend.range }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'

// 범례 항목을 위한 타입 정의
export interface LegendDefinition {
  status: string
  text: string
  range: string
}

const props = defineProps({
  legendItems: {
    type: Array as PropType<LegendDefinition[]>,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.emoji-info {
  border-top: 0.1rem solid #e2e2e2;
  padding-top: 3.2rem;
  margin-top: 3.2rem;
  margin-bottom: 3.2rem;
  ul {
    display: flex;
    flex-direction: column;
    gap: 1.2rem 0;
  }
  li {
    font-size: 1.4rem;
    color: #555;
    font-weight: 400;
    display: flex;
    gap: 0 0.8rem;
    align-items: center;
    .emoji {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      animation: none;
      &.sleep-division-box {
        flex-shrink: 0;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 0.2rem;
        &.REM {
          background-color: #9b48ff;
        }
        &.light {
          background-color: #41bcf5;
        }
        &.deep {
          background-color: #243e8e;
        }
      }
    }
    span {
      position: relative;
      & + span {
        padding-left: 0.8rem;
        &::before {
          content: '';
          width: 0.1rem;
          height: 1.2rem;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          background: #d2d2d2;
        }
      }
    }
  }
}
</style>
