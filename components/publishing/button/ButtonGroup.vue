<template>
  <div class="btn-group" :style="gapStyle" :class="{ asymmetric: asymmetric }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  gap: [Number, String],
  asymmetric: {
    type: Boolean,
    default: false
  }
})

// 문자열과 숫자 모두 처리
const gapValue = props.gap ? (typeof props.gap === 'string' ? parseFloat(props.gap) : props.gap) : 0
const gapStyle = gapValue ? { gap: `${gapValue / 10}rem` } : {}
</script>

<style scoped lang="scss">
.btn-group {
  display: flex;
  // gap이 없을 때만 적용
  &:not([style*='gap']) {
    :deep(.c-btn:first-child) {
      width: 15.2rem;
      flex-shrink: 0;
    }
  }
  &.is-fixed {
    :deep(.c-btn) {
      border-radius: 0;
    }
  }
  &.asymmetric {
    :deep(.c-btn:first-child) {
      flex: 0; // 첫 번째 버튼이 두 배 넓이
      min-width: 12rem;
    }

    :deep(.c-btn:not(:first-child)) {
      flex: 1;
      min-width: 0;
    }
  }
  &.asymmetric.is-fixed {
    :deep(.c-btn:first-child) {
      min-width: 15.2rem;
    }
  }
}
</style>
