<template>
  <!-- 공통 bottom navigation item -->
  <NuxtLink v-slot="{ navigate, isActive }" custom :to="path">
    <button type="button" role="tab" class="tabbar-btn" :aria-selected="isActive" @click="navigate()">
      <i v-if="icon" class="icon bottom-navi" :class="icon" aria-hidden="true"></i>
      <span class="text">{{ label }}</span>
    </button>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BaseTabbarItemProps } from '@/types/fo-ui/tabbaritem.type'

withDefaults(defineProps<BaseTabbarItemProps>(), {
  path: '',
  icon: '',
  label: ''
})
</script>
<style scoped lang="scss">
.tabbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.8rem 0;
  flex: 1;
  position: relative;
  height: var(--c-tabbar-height);
  @include mixin.rippleEffectWhite;
  .text {
    line-height: 1.4rem;
    font-weight: vars.$medium;
    color: #959595;
    font-size: 1.2rem;
    margin-bottom: 0.7rem;
  }
  .icon {
    width: 2.8rem;
    height: 2.8rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  &[aria-selected='true'] {
    .text {
      color: #373428;
    }
  }
}
</style>
