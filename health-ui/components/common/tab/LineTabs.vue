<template>
  <div class="line-tabs">
    <div class="tabs-container">
      <template v-for="(tab, index) in props.tabs" :key="tab.code">
        <button class="tab-link" :class="{ active: props.activeIndex === index }" @click="tabClick(index)">
          {{ tab.name }}
          <div class="tab-active-bar"></div>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Tab {
  name: string
  code: string
}

interface LineTabsProps {
  tabs: Tab[]
  activeIndex?: number // 외부에서 활성 탭 제어
}

const props = withDefaults(defineProps<LineTabsProps>(), {
  activeIndex: 0
})

const emit = defineEmits(['tab-click'])

const tabClick = (index: number) => {
  emit('tab-click', index)
}
</script>

<style scoped lang="scss">
.line-tabs {
  .tabs-container {
    display: flex;
    justify-content: space-around;
    border-bottom: 0.1rem solid #e2e2e2;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0 -2rem;
    // padding: 0 2rem; // 패딩은 컴포넌트 밖에서 class로 조정
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }

    .tab-link {
      text-decoration: none;
      color: #555;
      display: inline-flex;
      padding-bottom: 1.6rem;
      padding-top: 0.8rem;
      font-weight: vars.$bold;
      font-size: 1.6rem;
      justify-content: center;
      white-space: nowrap;
      transition: all 0.3s ease;
      border: none;
      background: transparent;
      cursor: pointer;
      position: relative; /* tab-active-bar를 위한 상대 위치 */

      flex: 1;
      min-width: auto;
      @include mixin.rippleEffectPrimary;

      /* 모든 탭에 기본 active-bar 스타일 적용 */
      .tab-active-bar {
        position: absolute;
        bottom: 0;
        left: 50%; /* 중앙에서 시작 */
        height: 0.3rem;
        background-color: #4c7ff7;
        width: 0; /* 초기 너비 0 */
        transform: translateX(-50%) translateZ(0); /* 중앙 정렬 + GPU 가속 */
        transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 자연스러운 이징 */
        will-change: width;
      }

      &.active {
        color: #4c7ff7;

        .tab-active-bar {
          width: 100%; /* 전체 너비로 확장 */
        }
      }
    }
  }
}
</style>
