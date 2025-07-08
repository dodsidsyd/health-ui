<template>
  <div class="inquiry-tit-wrap">
    <div class="flex space-between">
      <CommonBadge :class="badgeClasses">{{ badgeText }}</CommonBadge>
      <span>2025.06.01</span>
    </div>
    <p class="tit">{{ titleText }}</p>
  </div>
  <hr />
</template>

<script setup lang="ts">
import CommonBadge from '~/components/common/badge/CommonBadge.vue'
// Props 정의
interface Props {
  color?: 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown'
  variant?: 'solid' | 'outline' | 'soft'
  badgeText: string
  titleText: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'default',
  variant: 'soft'
})

// 동적 클래스 계산
const badgeClasses = computed(() => {
  const classes = ['badge']

  // 컬러 클래스 추가
  if (props.color !== 'default') {
    classes.push(`badge-${props.color}`)
  }

  // 변형 클래스 추가
  if (props.variant !== 'soft') {
    classes.push(`badge-${props.variant}`)
  }

  return classes
})
</script>

<style lang="scss" scoped>
.inquiry-tit-wrap {
  padding: 1.2rem 0;
  span {
    font-size: 1.4rem;
    color: var(--gray-11);
  }
}
.tit {
  margin-top: 0.6rem;
  color: var(--gray-16);
  font-size: 1.6rem;
  font-weight: 700;
}
hr {
  width: auto;
  height: 0.1rem;
  margin: 0 -2rem;
  background-color: var(--gray-light);
  border: none;
}
</style>
