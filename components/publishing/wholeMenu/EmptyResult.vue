<template>
  <div class="empty-reuslt" :class="{ 'is-absolute': isAbsolute }">
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
  },
  isAbsolute: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.empty-reuslt {
  // position: relative;
  flex: 1;
  &.is-absolute {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
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
