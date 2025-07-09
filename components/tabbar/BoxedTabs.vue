<template>
  <div class="boxed-tabs">
    <div ref="tabsContainerRef" class="tabs-container">
      <template v-for="(tab, index) in props.tabs" :key="tab.key || tab.to || index">
        <NuxtLink
          v-if="tab.to"
          :to="tab.to"
          :class="{
            active: isActive(tab, index),
            'line-type': props.variant === 'line-type',
            'fill-type': props.variant === 'fill-type',
            'closable-type': props.variant === 'closable-type'
          }"
          class="tab-link"
        >
          <span v-if="props.variant === 'closable-type'" class="tab-title"
            >{{ tab.title }}
            <span class="tab-count">{{ tab.count }}</span>
          </span>
          <span v-else
            >{{ tab.title }}
            <span class="tab-count">{{ tab.count }}</span>
          </span>
          <button
            v-if="props.variant === 'closable-type' && tab.closable !== false"
            class="close-btn"
            @click.stop.prevent="handleTabClose(tab, index)"
            aria-label="탭 닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 2L2 10M10 10L2 2" stroke="#959595" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </button>
        </NuxtLink>
        <button
          v-else
          :class="{
            active: isActive(tab, index),
            'line-type': props.variant === 'line-type',
            'fill-type': props.variant === 'fill-type',
            'closable-type': props.variant === 'closable-type'
          }"
          class="tab-link"
          @click="handleTabClick(tab, index)"
        >
          <span class="tab-title"
            >{{ tab.title }}<span class="tab-count">{{ tab.count }}</span>
          </span>
          <button
            v-if="props.variant === 'closable-type' && tab.closable !== false"
            class="close-btn"
            @click.stop.prevent="handleTabClose(tab, index)"
            aria-label="탭 닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 2L2 10M10 10L2 2" stroke="#959595" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </button>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app'
import { computed, watch, nextTick, ref, onMounted } from 'vue'

export interface BoxTab {
  title: string
  count?: string
  to?: string // 라우팅이 필요한 경우
  key?: string // 독립적인 탭 관리를 위한 키
  closable?: boolean // 탭 닫기 버튼 표시 여부 (closable-type에서만 사용, 기본값: true)
}

// 호환성을 위해 Tab도 export
export type Tab = BoxTab

// 스타일 타입 정의
export type BoxedTabsVariant = 'line-type' | 'fill-type' | 'closable-type'

interface Props {
  tabs: Tab[]
  // eslint-disable-next-line vue/require-default-prop
  activeKey?: string // 외부에서 활성 탭 제어
  variant?: BoxedTabsVariant // 스타일 타입 ('line-type' | 'fill-type')
}

interface Emits {
  (e: 'tab-change', key: string, tab: Tab): void // 탭 변경 이벤트
  (e: 'tab-close', key: string, tab: Tab, index: number): void // 탭 닫기 이벤트
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'fill-type' // 기본값은 fill-type
})
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

// 탭 닫기 핸들러
const handleTabClose = (tab: Tab, index: number) => {
  if (tab.key) {
    emit('tab-close', tab.key, tab, index)
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

// BoxedTabs는 항상 auto 너비 사용 (컨텐츠에 따라 자동 조정)
const isScrollMode = computed(() => {
  // BoxedTabs는 항상 스크롤 모드 (auto 너비)
  return true
})

// 활성 탭이 보이도록 스크롤하는 함수
const scrollToActiveTab = () => {
  if (!tabsContainerRef.value) return

  const container = tabsContainerRef.value
  const activeIndex = activeTabIndex.value
  const tabLinks = container.querySelectorAll('.tab-link')
  const activeTab = tabLinks[activeIndex] as HTMLElement

  if (!activeTab) return

  // 활성 탭의 위치 계산
  const activeTabLeft = activeTab.offsetLeft
  const activeTabRight = activeTabLeft + activeTab.offsetWidth

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

// 컴포넌트 마운트 시 초기화
onMounted(async () => {
  await nextTick()
  if (tabsContainerRef.value) {
    containerWidth.value = tabsContainerRef.value.clientWidth
    updateTabStyles()
  }
})

// 탭 스타일 업데이트 함수 (BoxedTabs는 항상 auto 너비)
const updateTabStyles = (isResize = false) => {
  if (!tabsContainerRef.value) return

  const container = tabsContainerRef.value
  const tabLinks = container.querySelectorAll('.tab-link')

  // BoxedTabs는 항상 auto 너비 사용
  tabLinks.forEach((link: HTMLElement) => {
    link.style.width = 'auto'
    link.style.minWidth = 'auto'
    link.style.flex = 'none'
  })

  // 컨테이너는 flex-start로 정렬
  container.style.justifyContent = 'flex-start'
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

      // fill-type 스타일 (기본)
      &.fill-type {
        background-color: #e8e8e8;
        color: #555;

        &.active {
          background-color: #4f5561;
          color: vars.$white;
          font-weight: vars.$semibold;
          .tab-count {
            color: #fbc700;
          }
        }
      }

      // line-type 스타일
      &.line-type {
        border: 0.2rem solid #e2e2e2;
        background-color: vars.$white;
        color: #555;

        &.active {
          border-color: vars.$blue-primary;
          color: vars.$white;
          font-weight: vars.$semibold;
          color: #2b2b2b;
        }
      }

      // closable-type 스타일
      &.closable-type {
        background-color: #fff;
        color: #555;
        border: 0.1rem solid #e2e2e2;
        padding: 0.8rem 1.6rem;
        display: flex;
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.8rem;
        align-items: center;
        box-sizing: border-box;
        gap: 0.4rem;

        .tab-title {
          flex: 1;
        }

        .close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.8rem;
          height: 1.8rem;
          background: none;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          color: #6c757d;
          transition: all 0.2s ease;
          flex-shrink: 0;
          position: relative;
          z-index: 1;

          &:hover {
            background-color: rgba(108, 117, 125, 0.1);
            color: #495057;
          }

          svg {
            width: 1.2rem;
            height: 1.2rem;
            pointer-events: none;
          }
        }
      }
    }
    .tab-count {
      margin-left: 0.2rem;
    }
  }
  &.green {
    .tabs-container {
      .tab-link {
        &.fill-type {
          background-color: #ddeec2;
          color: #56761f;
        }
      }
    }
  }
}
</style>
