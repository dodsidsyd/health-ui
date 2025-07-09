<template>
  <div class="segmented-tabs">
    <div class="tabs-container">
      <template v-for="(tab, index) in props.tabs" :key="tab.code">
        <button
          class="tab-link"
          :class="{ active: props.activeIndex === index }"
          :style="tabStyle"
          @click="tabClick(index)"
        >
          <span>{{ tab.name }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SegmentTab {
  name: string
  code: string
}

interface SegmentedTabsProps {
  tabs: SegmentTab[]
  activeIndex?: number
}

const props = withDefaults(defineProps<SegmentedTabsProps>(), {
  activeIndex: 0
})

const emit = defineEmits(['tab-click'])

const tabClick = (index: number) => {
  emit('tab-click', index)
}

// 각 탭의 너비를 동적으로 계산
const tabStyle = computed(() => {
  const tabCount = props.tabs.length
  const width = tabCount > 0 ? 100 / tabCount : 0

  return {
    width: `${width}%`,
    flex: `0 0 ${width}%`
  }
})
</script>

<style scoped lang="scss">
.segmented-tabs {
  width: 100%;

  .tabs-container {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 100%;
    border-radius: 0.6rem;
    padding: 0.3rem;
    gap: 0;

    .tab-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      border: 0.1rem solid #e2e2e2;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.3s ease;
      position: relative;

      // 공통 스타일 - % 비율로 설정
      padding: 1.2rem;
      font-size: 1.4rem;
      font-weight: vars.$medium;
      background-color: vars.$white;
      border-right-width: 0;
      border-collapse: collapse;
      color: #555;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      // % 비율 설정 (동적으로 JavaScript에서 설정)
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      @include mixin.rippleEffectPrimary;
      &:active {
        transform: none;
      }

      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:first-child {
        border-top-left-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
      }

      &:last-child {
        border-right-width: 0.1rem;
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
      }

      &.active {
        border-right-width: 0.1rem;
        background-color: vars.$white;
        color: #2b2b2b;
        border-color: #555;
      }
    }
  }
}
</style>
