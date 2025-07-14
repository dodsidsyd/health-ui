<template>
  <div class="segmented-tabs">
    <div ref="tabsContainerRef" class="tabs-container">
      <template v-for="(tab, index) in props.tabs" :key="tab.key || tab.to || index">
        <NuxtLink
          v-if="tab.to"
          :to="tab.to"
          :class="{
            active: isActive(tab, index)
          }"
          class="tab-link"
        >
          <span>{{ tab.title }}</span>
        </NuxtLink>
        <button
          v-else
          @click="handleTabClick(tab, index)"
          :class="{
            active: isActive(tab, index)
          }"
          class="tab-link"
        >
          <span>{{ tab.title }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app'
import { computed, watch, nextTick, ref, onMounted } from 'vue'

export interface SegmentTab {
  title: string
  to?: string // 라우팅이 필요한 경우
  key?: string // 독립적인 탭 관리를 위한 키
}

// 호환성을 위해 Tab도 export
export type Tab = SegmentTab

interface Props {
  tabs: Tab[]
  activeKey?: string // 외부에서 활성 탭 제어
}

interface Emits {
  (e: 'tab-change', key: string, tab: Tab): void // 탭 변경 이벤트
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const route = useRoute()
const tabsContainerRef = ref<HTMLElement>()

// 탭 클릭 핸들러 (버튼 전용)
const handleTabClick = (tab: Tab, index: number) => {
  // activeKey prop이 있는 경우 (독립적인 상태 관리)
  if (props.activeKey !== undefined && tab.key) {
    emit('tab-change', tab.key, tab)
    return
  }

  // to가 없는 경우 이벤트 발생
  if (!tab.to && tab.key) {
    emit('tab-change', tab.key, tab)
  }
}

// 활성 탭 확인
const isActive = (tab: Tab, index: number) => {
  // activeKey prop이 있으면 우선 사용 (독립적인 상태 관리)
  if (props.activeKey !== undefined) {
    return tab.key === props.activeKey
  }

  // 기존 URL 기반 비교 (라우팅 기반)
  if (tab.to) {
    const currentFullPath =
      route.path +
      (route.query && Object.keys(route.query).length > 0
        ? '?' + new URLSearchParams(route.query as Record<string, string>).toString()
        : '')
    return currentFullPath === tab.to
  }

  // 둘 다 없으면 첫 번째 탭이 활성
  return index === 0
}

// 현재 활성 탭의 인덱스
const activeTabIndex = computed(() => {
  // activeKey prop이 있는 경우
  if (props.activeKey !== undefined) {
    const index = props.tabs.findIndex(tab => tab.key === props.activeKey)
    return index >= 0 ? index : 0
  }

  // 기존 URL 기반
  const currentFullPath =
    route.path +
    (route.query && Object.keys(route.query).length > 0
      ? '?' + new URLSearchParams(route.query as Record<string, string>).toString()
      : '')
  const index = props.tabs.findIndex(tab => tab.to === currentFullPath)
  return index >= 0 ? index : 0
})

// route 변경 감지 (라우팅 기반일 때만)
watch(
  () => [route.path, route.query],
  async () => {
    if (props.activeKey === undefined) {
      await nextTick()
      updateTabStyles()
    }
  },
  { immediate: true }
)

// activeKey 변경 감지 (독립적인 상태 관리일 때)
watch(
  () => props.activeKey,
  async () => {
    if (props.activeKey !== undefined) {
      await nextTick()
      updateTabStyles()
    }
  },
  { immediate: true }
)

// 컴포넌트 마운트 시 초기화
onMounted(async () => {
  await nextTick()
  updateTabStyles()
})

interface Props {
  tabs: Tab[]
  activeKey?: string
  columns?: number
}

// 탭 스타일 업데이트 함수 (SegmentedTabs는 항상 % 비율)
const updateTabStyles = () => {
  if (!tabsContainerRef.value) return

  const container = tabsContainerRef.value
  const tabLinks = container.querySelectorAll('.tab-link')
  // const tabCount = props.tabs.length
  const tabCount = props.columns ?? props.tabs.length
  // 각 탭에 동일한 % 비율 적용
  const percentWidth = 100 / tabCount

  tabLinks.forEach((link: HTMLElement) => {
    // link.style.width = `calc(${percentWidth}% - 0.1px)`
    link.style.width = `${percentWidth}%`
    // link.style.flex = `0 0 calc(${percentWidth}% - 0.1px)`
    link.style.flex = `0 0 ${percentWidth}%`
    link.style.minWidth = 'auto'
  })
}
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
    padding: 0.3rem 0;
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
      transition: border 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      // % 비율 설정 (동적으로 JavaScript에서 설정)
      flex: 1;
      min-width: 0;

      box-sizing: border-box;
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
@media (max-width: 375px) {
  .segmented-tabs {
    .tabs-container {
      .tab-link {
        padding: 1.2rem 0.8rem;
      }
    }
  }
}
</style>
