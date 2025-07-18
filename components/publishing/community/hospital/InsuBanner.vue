<template>
  <div>
    <NuxtLink to="#" class="designer-banner">
      <p class="banner-text">{{ bannerText }}</p>
      <strong v-html="bannerTitle" class="banner-title"></strong>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const bannerText = ref('월 평균 청구 횟수가 적네요!')
const props = withDefaults(
  defineProps<{
    bannerText?: string
    bannerTitle?: string
  }>(),
  {
    bannerText: '월 평균 청구 횟수가 적네요!',
    bannerTitle: ''
  }
)
</script>
<style lang="scss" scoped>
.designer-banner {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow: hidden;
  padding: 2.8rem 2.4rem;
  border-radius: 1.2rem;
  background: #e9f7ff url('~/assets/images/community/ico-designer.svg') no-repeat right center;
  .banner-text {
    line-height: 2.2rem;
    font-weight: 500;
    color: #5294ff;
  }
  .banner-title {
    font-size: 1.8rem;
    line-height: 2.5rem;
  }
}
</style>
