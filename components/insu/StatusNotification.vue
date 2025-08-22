<template>
  <div class="status-notification">
    <span class="badge">알림</span>
    <div class="content">
      <strong class="count">{{ count }}건</strong>
      <p class="text">의 의료영상 발급 완료 결과를 확인해주세요.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  count: number
}>()
</script>
<style lang="scss" scoped>
.status-notification {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 2rem;
  padding: 1.2rem;
  border-radius: 0.8rem;
  background: #eef2fb;
  .badge {
    overflow: hidden;
    padding: 0.3rem 0.6rem;
    border-radius: 0.4rem;
    background: #5782e7;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    color: #fff;
  }
  .content {
    display: flex;
    align-items: center;
    * {
      font-size: 1.4rem;
      line-height: 2rem;
    }
  }

  .count {
    font-weight: 500;
    color: #4c7ff7;
  }
  .text {
    font-weight: 400;
  }
}
</style>
