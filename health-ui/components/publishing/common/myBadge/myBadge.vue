<template>
  <div class="badge-wrap" :class="{ empty: variant === 'empty' }">
    <div :class="badgeClasses">
      <img v-if="variant !== 'empty'" :src="imageName" :alt="title" />
    </div>
    <p class="badge-tit">{{ title }}</p>
    <span class="badge-date">{{ date }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
interface Props {
  type?: 'walked' | 'streak' | 'health' | 'community'
  variant?: 'empty'
  title: string
  date?: string
  imageName?: string
}

// props와 기본값 설정
const props = withDefaults(defineProps<Props>(), {
  date: '도전'
})

const badgeClasses = computed(() => {
  const classes = ['badge']
  classes.push(`badge-${props.type}`)
  return classes
})
</script>

<style lang="scss" scoped>
.badge-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 11rem;
  width: 100%;
  height: 15.4rem;
  padding: 1.6rem 1.2rem;
  border-radius: 1.2rem;
  border: 1px solid var(--gray-light);
  background: #f9f9f9;
  text-align: center;
  color: var(--gray-16);
  .badge-tit {
    font-size: 1.4rem;
    font-weight: 600;
  }
  .badge-date {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--gray-11);
  }
  &.empty {
    color: #959595;
    .badge-date {
      color: #959595;
    }
    .badge {
      &.badge-walked {
        background: url(~/assets/images/badge/icon-badge-empty1.svg) center / 8rem no-repeat;
      }
      &.badge-streak {
        background: url(~/assets/images/badge/icon-badge-empty2.svg) center / 8rem no-repeat;
      }
      &.badge-health {
        background: url(~/assets/images/badge/icon-badge-empty3.svg) center / 8rem no-repeat;
      }
      &.badge-community {
        background: url(~/assets/images/badge/icon-badge-empty4.svg) center / 8rem no-repeat;
      }
    }
  }
  .badge {
    width: 8rem;
    height: 8rem;
    margin-bottom: 0.6rem;
  }
}
</style>
