<template>
  <div class="boxed-tabs">
    <div class="tabs-container">
      <template v-for="(tab, index) in props.tabs" :key="tab.code">
        <button class="tab-link line-type" :class="{ active: props.activeIndex === index }" @click="tabClick(index)">
          <span class="tab-title">{{ tab.name }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface BoxTabLine {
  name: string
  code: string
}

interface BoxedTabsLineProps {
  tabs: BoxTabLine[]
  activeIndex?: number
}

const props = withDefaults(defineProps<BoxedTabsLineProps>(), {
  activeIndex: 0
})

const emit = defineEmits(['tab-click'])

const tabClick = (index: number) => {
  emit('tab-click', index)
}
</script>

<style scoped lang="scss">
.boxed-tabs {
  width: 100%;

  .tabs-container {
    display: flex;
    justify-content: center;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0 -2rem;
    padding: 0 2rem;
    gap: 0.6rem;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }

    .tab-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.3s ease;
      flex-shrink: 0;
      position: relative;

      // 공통 스타일
      padding: 0.8rem 2rem;
      font-size: 1.4rem;
      border-radius: 10rem;
      font-weight: vars.$semibold;
      width: auto;
      min-width: auto;
      flex: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      // line-type 스타일
      &.line-type {
        border: 0.2rem solid #e2e2e2;
        background-color: vars.$white;
        color: #555;
        @include mixin.rippleEffectPrimary;
        &.active {
          border-color: vars.$blue-primary;
          color: #2b2b2b;
          font-weight: vars.$semibold;
        }
      }
    }
  }
}
</style>
