<template>
  <div class="round-tabs">
    <div class="tabs-container">
      <template v-for="(tab, index) in props.tabs" :key="tab.code">
        <button class="tab-link" :class="{ active: props.activeIndex === index }" @click="tabClick(index)">
          <span class="tab-text">{{ tab.name }}</span>
          <div class="tab-active-bar"></div>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface RoundTab {
  name: string
  code: string
}

interface RoundTabsProps {
  tabs: RoundTab[]
  activeIndex?: number
}

const props = withDefaults(defineProps<RoundTabsProps>(), {
  activeIndex: 0
})

const emit = defineEmits(['tab-click'])

const tabClick = (index: number) => {
  emit('tab-click', index)
}
</script>

<style scoped lang="scss">
.round-tabs {
  width: 100%;

  .tabs-container {
    display: flex;
    justify-content: center;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    padding: 0.4rem;
    gap: 0.8rem;
    background-color: vars.$gray-light;
    border-radius: 2.4rem;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }

    .tab-link {
      flex: 1;
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

      // 기본 스타일
      padding: 0.8rem 1.6rem;
      font-size: 1.4rem;
      border-radius: 2rem;
      font-weight: vars.$medium;
      background-color: transparent;
      color: #555;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      .tab-text {
        position: relative;
        z-index: 2;
      }

      .tab-active-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: vars.$blue-primary;
        border-radius: 2rem;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 자연스러운 이징 */
        transform: translateZ(0) scale(0); /* 초기 scale 0 */
        will-change: opacity, transform;
        opacity: 0; /* 기본적으로 숨김 */
      }

      &.active {
        color: vars.$white;
        font-weight: vars.$semibold;

        .tab-active-bar {
          opacity: 1;
          transform: translateZ(0) scale(1); /* scale 1로 확대 */
        }
      }
    }
  }
}
</style>
