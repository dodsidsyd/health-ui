<template>
  <div class="empty-reuslt">
    <div class="empty-image"></div>
    <p>{{ title }}</p>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '검색 결과가 없습니다.'
  }
})
</script>

<style lang="scss" scoped>
.empty-reuslt {
  // position: relative;
  flex: 1;

  .empty-image {
    width: 8rem;
    height: 8rem;
    margin: auto;
    background: url('~/assets/images/insu/icon-empty.svg') no-repeat center center;
  }
  p {
    margin: 1.6rem 0 1rem;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 2.5rem;
    color: #555;
    text-align: center;
  }
}
</style>
