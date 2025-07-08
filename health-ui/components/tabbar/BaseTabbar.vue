<template>
  <!-- 공통 bottom navigation -->
  <div :class="`c-tabbar fixed-${position}`">
    <div role="tablist" class="c-tabbar-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseTabbarProps } from '@/types/fo-ui/tabbar.type'

withDefaults(defineProps<BaseTabbarProps>(), {
  position: 'bottom'
})
</script>

<style lang="scss">
// 공통 bottom navigation
.c-tabbar {
  --c-tabbar-bezier: cubic-bezier(0.4, 0, 0.2, 1);
  --c-tabbar-height: 6.8rem;
  --c-tabbar-btn-width: 3rem;

  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: 2.4rem 2.4rem 0 0;
  background-repeat: no-repeat;
  background-color: rgb(var(--white));
  background-position: 50% 50%;
  box-shadow: 0 -0.2rem 1.5rem 0 rgba(0, 0, 0, 0.05);

  // 다크 모드
  // &[data-theme="dark"] {
  //     background-color: rgb(var(--black));
  //     .tabbar-btn {
  //         &[aria-selected="true"] {
  //             .icon {
  //                 background-color: rgb(var(--white));
  //             }
  //             .text {
  //                 color: rgb(var(--white));
  //             }
  //         }
  //         @include mixin.rippleEffectPrimary;
  //     }
  // }
  // 가운데 정렬
  &.center {
    box-sizing: content-box;
    padding: 0.75rem 0 0;
    border-top: 0;
    .tabbar-btn {
      padding: 0.75rem 0;
      &.home {
        position: absolute;
        left: 50%;
        transform: translate(-38%, 0);
        z-index: 1;
        flex: 0 0 var(--c-tabbar-btn-width);
        width: var(--c-tabbar-btn-width);
        height: var(--c-tabbar-btn-width);
        margin-top: -20px;
        border-radius: 50%;
        background-color: var(--white);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        .icon {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: iconBounce 0.75s ease-out infinite alternate;
        }
        .text {
          padding-top: 20px;
        }
      }
    }
    .c-tabbar-group {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-grow: 1;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
      &:first-of-type {
        margin-right: calc(var(--c-tabbar-btn-width) / 2);
        padding-right: calc(var(--c-tabbar-btn-width) / 2);
        border-radius: 0 50% 0 0 / 0 100% 0 0;
        transition: border-radius 0.3s;
      }
      &:last-of-type {
        margin-left: calc(var(--c-tabbar-btn-width) / 2);
        padding-left: calc(var(--c-tabbar-btn-width) / 2);
        border-radius: 50% 0 0 0 / 100% 0 0 0;
        transition: border-radius 0.3s;
      }
      @media (min-width: 440px) {
        &:first-of-type {
          border-radius: 0 30% 0 0 / 0 100% 0 0;
        }
        &:last-of-type {
          border-radius: 30% 0 0 0 / 100% 0 0 0;
        }
      }
    }
  }
  // 하단 고정
  &.fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
}

.c-tabbar-inner {
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding-top: 0.4rem;
  height: var(--c-tabbar-height);
}
@keyframes iconBounce {
  0% {
    transform: translate(-50%, -1px);
  }
  100% {
    transform: translate(-50%, 1px);
  }
}
</style>
