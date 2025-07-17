<template>
  <div class="link-item">
    <NuxtLink :to="href" class="btn-link">
      <div class="icon-box">
        <i :class="['icon', iconClass]"></i>
      </div>
      <p class="text">{{ text }}</p>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href?: string
    text?: string
    iconClass: string
  }>(),
  {
    href: '#',
    text: '',
    iconClass: ''
  }
)
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
    gap: 1.2rem;
    .icon-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4.8rem;
      height: 4.8rem;
      overflow: hidden;
      border-radius: 9.9rem;
      background: #f4f4f4;
    }
    .icon {
      width: 2.8rem;
      height: 2.8rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.8rem;
    }
    .text {
      flex: 1;
      margin-left: 0.8rem;
      padding-right: 3.2rem;
      @include mixin.ellipsis;
      font-weight: 700;
    }
  }
}
</style>
