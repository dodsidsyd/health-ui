<template>
  <div class="notice-item">
    <NuxtLink to="#" class="btn-link">
      <span :class="['badge', { 'badge-info': type === 'info', 'badge-import': type === 'import' }]">{{ label }}</span>
      <p class="notice-text">{{ text }}</p>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
interface NoticeTextItem {
  id: number
  text: string
}

interface Props {
  text?: NoticeTextItem[]
  label?: string
  type?: 'info' | 'import'
}
const props = defineProps<Props>()
</script>
<style scoped lang="scss">
.notice-item {
  .btn-link {
    display: flex;
    align-items: center;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 7L15 12L10 17' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 2.4rem;
    .badge {
      padding: 0.3rem 0.8rem;
      border-radius: 1.1rem;
      font-size: var(--num-12);
      font-weight: vars.$medium;
      color: #5d4a00;
      &.badge-info {
        background: #faeaa9;
      }
      &.badge-import {
        background: #ffc6c6;
      }
    }
    .notice-text {
      margin-left: 0.8rem;
      padding-right: 3.2rem;
      @include mixin.ellipsis;
      font-size: var(--num-14);
      font-weight: vars.$medium;
      color: #555555;
    }
  }
}
</style>
