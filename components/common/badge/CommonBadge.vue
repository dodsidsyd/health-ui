<template>
  <span :class="badgeClasses">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
interface Props {
  color?: 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown' | 'gray' | 'deepRed'
  variant?: 'solid' | 'outline' | 'soft'
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
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // height: 2.2rem;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
  border-radius: 0.4rem;
  transition: all 0.2s ease;
  padding: 0.3rem 0.6rem;
  box-sizing: border-box;
  // 기본 스타일 (default)
  flex-shrink: 0;
  color: #555;
  background-color: #eee;

  &.badge-red {
    color: #ca2828;
    background: #ffe7e7;

    &.badge-solid {
      color: white;
      background: #ca2828;
    }
  }
  &.badge-deepRed {
    color: #c82626;
    background: #ffe7e7;
    &.badge-solid {
      color: white;
      background: #c82626;
    }
  }
  &.badge-orange {
    color: #e75126;
    background: #ffecdb;

    &.badge-solid {
      color: white;
      background: #e75126;
    }
  }

  &.badge-yellow {
    color: #8d7000;
    background: #fef4cc;

    &.badge-solid {
      color: white;
      background: #b8941a;
    }
  }

  &.badge-green {
    color: #506a1d;
    background: #eaf2cc;

    &.badge-solid {
      color: white;
      background: #506a1d;
    }
  }

  &.badge-blue {
    color: #4c7ff7;
    background: #e5edff;

    &.badge-solid {
      color: white;
      background: #4c7ff7;
    }
  }

  &.badge-purple {
    color: #6449fc;
    background: #e7e3ff;

    &.badge-solid {
      color: white;
      background: #6449fc;
    }
  }

  &.badge-brown {
    color: #c36f00;
    background: #e7e3ff;

    &.badge-solid {
      color: white;
      background: #c36f00;
    }
  }
  &.badge-gray {
    color: #919191;
    background: #e7e3ff;
    &.badge-solid {
      color: white;
      background: #919191;
    }
  }
}
</style>
