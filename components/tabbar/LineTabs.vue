<template>
  <div class="line-tabs">
    <div ref="tabsContainerRef" class="tabs-container">
      <template v-for="(tab, index) in props.tabs" :key="tab.key || tab.to || index">
        <NuxtLink v-if="tab.to" :to="tab.to" :class="{ active: isActive(tab, index) }" class="tab-link">
          {{ tab.title }}
        </NuxtLink>
        <button v-else @click="handleTabClick(tab, index)" :class="{ active: isActive(tab, index) }" class="tab-link">
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

export interface Tab {
  title: string
  to?: string // 라우팅이 필요한 경우
  key?: string // 독립적인 탭 관리를 위한 키
}

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
const activeBarRef = ref<HTMLElement>()
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
    const isActiveTab = currentFullPath === tab.to

    // 디버깅용 로그
    console.log('LineTabs isActive:', {
      tabTitle: tab.title,
      tabTo: tab.to,
      currentPath: route.path,
      currentFullPath,
      isActiveTab
    })

    return isActiveTab
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

// 각 탭의 동적 너비 계산 (% 또는 고정 너비)
const tabWidth = computed(() => {
  const minTabWidth = 100 // 10rem = 100px 최소 너비
  const currentContainerWidth = containerWidth.value // 리액티브 변수 사용
  const tabCount = props.tabs.length

  // 전체 너비를 탭 개수로 나눈 너비
  const calculatedWidth = currentContainerWidth / tabCount

  // 계산된 너비가 최소 너비보다 작으면 최소 너비 사용 (스크롤 모드)
  if (calculatedWidth < minTabWidth) {
    return minTabWidth
  }

  // 그렇지 않으면 퍼센트 기반 너비 사용
  return calculatedWidth
})

// 스크롤 모드인지 확인
const isScrollMode = computed(() => {
  const minTabWidth = 100 // 10rem = 100px 최소 너비
  const currentContainerWidth = containerWidth.value // 리액티브 변수 사용
  const tabCount = props.tabs.length
  const calculatedWidth = currentContainerWidth / tabCount

  const scrollMode = calculatedWidth < minTabWidth

  return scrollMode
})

// active bar 스타일 계산
const activeBarStyle = computed(() => {
  const width = tabWidth.value
  const left = activeTabIndex.value * width

  return {
    width: width + 'px',
    left: left + 'px'
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
    // 왼쪽으로 스크롤
    container.scrollTo({
      left: activeTabLeft - 20, // 약간의 여백
      behavior: 'smooth'
    })
  } else if (activeTabRight > containerRight) {
    // 오른쪽으로 스크롤
    container.scrollTo({
      left: activeTabRight - container.clientWidth + 20, // 약간의 여백
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
      // 라우팅 기반일 때만
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
      // ResizeObserver로 컨테이너 크기 변경 감지
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          const newWidth = entry.contentRect.width

          containerWidth.value = newWidth

          // 탭 링크들에 동적 스타일 적용
          setTimeout(() => {
            updateTabStyles(true) // 리사이즈 시임을 표시
          }, 50) // 약간의 디바운스로 안정성 향상
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
    container.style.justifyContent = 'space-around'
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

      flex: 1;
      min-width: auto;

      &.active {
        color: #4c7ff7;
      }
    }

    .tab-active-bar {
      position: absolute;
      bottom: 0;
      height: 0.3rem;
      background-color: #4c7ff7;
      transition:
        left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateZ(0); /* GPU 가속 */
      will-change: left, width;
    }
  }
}
</style>
