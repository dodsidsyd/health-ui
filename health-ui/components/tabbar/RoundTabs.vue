<template>
  <div class="round-tabs">
    <div ref="tabsContainerRef" class="tabs-container">
      <template v-for="(tab, index) in props.tabs" :key="tab.key || tab.to || index">
        <NuxtLink v-if="tab.to" :to="tab.to" :class="{ active: isActive(tab, index) }" class="tab-link">
          {{ tab.title }}
        </NuxtLink>
        <button v-else :class="{ active: isActive(tab, index) }" class="tab-link" @click="handleTabClick(tab, index)">
          {{ tab.title }}
        </button>
      </template>

      <!-- Active Bar -->
      <div ref="activeBarRef" class="tab-active-bar" :style="activeBarStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app'
import { computed, watch, nextTick, ref, onMounted } from 'vue'

export interface RoundTab {
  title: string
  to?: string // 라우팅이 필요한 경우
  key?: string // 독립적인 탭 관리를 위한 키
}

// 호환성을 위해 Tab도 export
export type Tab = RoundTab

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
const activeBarRef = ref<HTMLElement>()

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

// 각 탭의 동적 너비 계산
const tabWidth = computed(() => {
  const minTabWidth = 100 // 10rem = 100px 최소 너비
  const containerWidth = tabsContainerRef.value?.clientWidth || 360
  const tabCount = props.tabs.length

  // 전체 너비를 탭 개수로 나눈 너비
  const calculatedWidth = containerWidth / tabCount

  // 계산된 너비가 최소 너비보다 작으면 최소 너비 사용 (스크롤 모드)
  if (calculatedWidth < minTabWidth) {
    return minTabWidth
  }

  // 그렇지 않으면 퍼센트 기반 너비 사용
  return calculatedWidth
})

// 스크롤 모드인지 확인
const isScrollMode = computed(() => {
  const minTabWidth = 100
  const containerWidth = tabsContainerRef.value?.clientWidth || 360
  const tabCount = props.tabs.length
  const calculatedWidth = containerWidth / tabCount

  return calculatedWidth < minTabWidth
})

// active bar 스타일 계산
const activeBarStyle = computed(() => {
  const tabCount = props.tabs.length
  const activeIndex = activeTabIndex.value

  if (tabCount === 0) {
    return { width: '0%', left: '0%', opacity: '0' }
  }

  // 각 탭의 정확한 너비 (퍼센트)
  const tabWidthPercent = 100 / tabCount

  // Active Bar의 너비는 탭과 100% 동일
  const barWidthPercent = tabWidthPercent

  // Active Bar의 left 위치 계산
  const barLeftPercent = activeIndex * tabWidthPercent

  return {
    width: `${barWidthPercent}%`,
    left: `${barLeftPercent}%`,
    opacity: '1'
  }
})

// 활성 탭이 보이도록 스크롤하는 함수
const scrollToActiveTab = () => {
  if (!tabsContainerRef.value || !isScrollMode.value) return

  const container = tabsContainerRef.value
  const activeIndex = activeTabIndex.value
  const currentTabWidth = tabWidth.value

  // 활성 탭의 위치 계산
  const activeTabLeft = activeIndex * currentTabWidth
  const activeTabRight = activeTabLeft + currentTabWidth

  // 현재 보이는 영역
  const containerLeft = container.scrollLeft
  const containerRight = containerLeft + container.clientWidth

  // 활성 탭이 보이지 않는 경우 스크롤
  if (activeTabLeft < containerLeft) {
    container.scrollTo({
      left: activeTabLeft - 20,
      behavior: 'smooth'
    })
  } else if (activeTabRight > containerRight) {
    container.scrollTo({
      left: activeTabRight - container.clientWidth + 20,
      behavior: 'smooth'
    })
  }
}

// 리사이즈 이벤트 감지를 위한 리액티브 변수
const containerWidth = ref(360)

// route 변경 감지 (라우팅 기반일 때만)
watch(
  () => [route.path, route.query],
  async () => {
    if (props.activeKey === undefined) {
      await nextTick()
      updateActiveBarPosition()
      scrollToActiveTab()
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
      updateActiveBarPosition()
      scrollToActiveTab()
    }
  },
  { immediate: true }
)

// 컨테이너 크기 변경 감지
watch(
  () => tabsContainerRef.value,
  newContainer => {
    if (newContainer) {
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          containerWidth.value = entry.contentRect.width
          setTimeout(() => {
            updateTabStyles(true) // 리사이즈 시임을 표시
          }, 50)
        }
      })
      resizeObserver.observe(newContainer)
    }
  }
)

// containerWidth 변경 시 Active Bar 위치 업데이트
watch(
  () => [containerWidth.value, isScrollMode.value],
  async () => {
    await nextTick()
    updateActiveBarPosition()
  }
)

// tabWidth 변경 시 Active Bar 위치 업데이트
watch(
  () => tabWidth.value,
  async () => {
    await nextTick()
    updateActiveBarPosition()
  }
)

// 컴포넌트 마운트 시 초기화
onMounted(async () => {
  await nextTick()
  if (tabsContainerRef.value) {
    containerWidth.value = tabsContainerRef.value.clientWidth
    updateTabStyles()

    // DOM이 완전히 렌더링된 후 Active Bar 표시
    setTimeout(() => {
      updateActiveBarPosition()
    }, 100)
  }
})

// 탭 스타일 업데이트 함수
const updateTabStyles = (isResize = false) => {
  if (!tabsContainerRef.value) return

  const container = tabsContainerRef.value
  const tabLinks = container.querySelectorAll('.tab-link')

  tabLinks.forEach((link: HTMLElement) => {
    if (isScrollMode.value) {
      // 스크롤 모드: 고정 너비
      link.style.minWidth = '10rem'
      link.style.width = '10rem'
      link.style.flex = 'none'
    } else {
      // 퍼센트 모드: 균등 분할
      const percentWidth = 100 / props.tabs.length
      link.style.minWidth = 'auto'
      link.style.width = `${percentWidth}%`
      link.style.flex = '1'
    }
  })

  // 컨테이너 스타일도 업데이트
  if (isScrollMode.value) {
    container.style.justifyContent = 'flex-start'
  } else {
    container.style.justifyContent = 'center'
  }

  // Active Bar 위치도 함께 업데이트 (리사이즈 시 트랜지션 없이)
  updateActiveBarPosition(isResize)
}

// Active Bar 위치 업데이트 함수
const updateActiveBarPosition = async (skipTransition = false) => {
  await nextTick()

  if (activeBarRef.value) {
    const style = activeBarStyle.value

    // 트랜지션 일시 비활성화 (리사이즈 시 즉시 반영)
    if (skipTransition) {
      activeBarRef.value.style.transition = 'none'
    }

    activeBarRef.value.style.left = style.left
    activeBarRef.value.style.width = style.width
    activeBarRef.value.style.opacity = style.opacity || '1'

    // 트랜지션 다시 활성화
    if (skipTransition) {
      setTimeout(() => {
        if (activeBarRef.value) {
          activeBarRef.value.style.transition = ''
        }
      }, 50)
    }
  }
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
      z-index: 1;

      // 기본 스타일
      padding: 0.8rem 1.6rem;
      font-size: 1.4rem;
      border-radius: 2rem;
      font-weight: vars.$medium;
      background-color: transparent;
      color: #555;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      &.active {
        color: vars.$white;
        font-weight: vars.$semibold;
      }
    }

    .tab-active-bar {
      position: absolute;
      top: 0;
      bottom: 0;
      background-color: vars.$blue-primary;
      border-radius: 10rem;
      border: 0.4rem solid vars.$gray-light;
      transition:
        left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s ease;
      transform: translateZ(0); /* GPU 가속 */
      will-change: left, width, opacity;
      z-index: 0;
      opacity: 0;
    }
  }
}
</style>
