<template>
  <div class="wrap-info-text">
    <i class="info" alt="info"></i>
    <div class="text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: '설명 텍스트 입니다'
  }
})
</script>

<style scoped lang="scss">
.wrap-info-text {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    color: #555;
  }
}
</style>
