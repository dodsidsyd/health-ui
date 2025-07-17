<template>
  <div class="link-item">
    <NuxtLink to="#" class="btn-link">
      <p :class="['text', textClass]">{{ text }}</p>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
interface NoticeTextItem {
  id: number
  text: string
  textClass?: string
}

interface Props {
  text?: NoticeTextItem[]
  textClass?: ''
}
const props = defineProps<Props>()
</script>
<style scoped lang="scss">
.link-item {
  .btn-link {
    display: flex;
    align-items: center;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 7L15 12L10 17' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 2.4rem;

    .text {
      padding-right: 3.2rem;
      @include mixin.ellipsis;
      font-size: 1.4rem;
      font-weight: 500;
      color: #555555;
    }
  }
}
</style>
