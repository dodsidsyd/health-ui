<template>
  <div class="steps-history-wrap" :class="className">
    <div class="flex space-between align-center">
      <span class="date">{{ date }}</span>
      <p class="total-steps">
        <strong>{{ total }}</strong
        >걸음
      </p>
    </div>
    <div class="summary-box">
      <p>
        건강걸음 <span>{{ steps }}</span>
      </p>
      <p>
        챌린지미션 <span>{{ mission }}</span>
      </p>
      <p>
        아이템 <span>{{ item }}</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = withDefaults(
  defineProps<{
    date: string
    total?: string
    steps?: string
    mission?: string
    item?: string
  }>(),
  {
    total: '0',
    steps: '0',
    mission: '0',
    item: '0'
  }
)
</script>
<style lang="scss" scoped>
.steps-history-wrap {
  position: relative;
  padding: 2rem 0;
  &:last-child {
    &::after {
      content: none;
    }
  }
  &::after {
    content: '';
    position: absolute;
    left: -2rem;
    right: -2rem;
    bottom: 0;
    height: 0.1rem;
    background-color: #eee;
  }
  .date {
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 2rem;
  }
  .total-steps {
    font-weight: 700;
    line-height: 2.2rem;
    strong {
      margin-right: 0.1rem;
      color: var(--blue-primary);
    }
  }
  .summary-box {
    display: flex;
    align-items: center;
    margin-top: 0.8rem;
    color: #555;
    font-size: 1.2rem;
    line-height: 1.6rem;
    p {
      display: flex;
      align-items: center;
      margin-right: 0.6rem;
      &:last-child {
        &::after {
          content: none;
        }
      }
      &::after {
        content: '';
        display: block;
        margin-left: 0.6rem;
        width: 0.3rem;
        height: 0.3rem;
        background-color: #959595;
        border-radius: 50%;
      }
    }
    span {
      margin-left: 0.2rem;
      font-weight: 600;
    }
  }
}
</style>
