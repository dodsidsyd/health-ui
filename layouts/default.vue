<template>
  <div>
    <BaseLayout>
      <!-- Header
                title: 헤더 제목(메인 페이지는 font-size:0;
                showBackButton: 뒤로가기 버튼 표시 여부
                logoType: 로고 타입 (text, image)
                showSearch: 검색 컴포넌트 표시 여부
                showSearchBtn: 검색 버튼 표시 여부 
            -->
      <BaseHeader
        v-if="headerOptions.showHeader"
        :title="headerTitle"
        :show-back-button="headerOptions.showBackButton"
        :back-ground="headerOptions.backGround"
        :logo-type="headerOptions.logoType"
        :logo-type-with-back="headerOptions.logoTypeWithBack"
        :show-search="headerOptions.showSearch"
        :show-search-btn="headerOptions.showSearchBtn"
        :search-with-select="headerOptions.searchWithSelect"
        :search-select-options="headerOptions.searchSelectOptions"
        :search-select-placeholder="headerOptions.searchSelectPlaceholder"
        :has-notification="headerOptions.hasNotification"
        :has-notification-dot="headerOptions.hasNotificationDot"
        :has-cart="headerOptions.hasCart"
        :has-reward="headerOptions.hasReward"
        :has-reward-dot="headerOptions.hasRewardDot"
        :has-setting="headerOptions.hasSetting"
        :has-search="headerOptions.hasSearch"
        :has-chat="headerOptions.hasChat"
        :has-scrap="headerOptions.hasScrap"
        :has-share="headerOptions.hasShare"
        :has-menu="headerOptions.hasMenu"
        :notification-count="headerOptions.notificationCount"
        :cart-count="headerOptions.cartCount"
        :chat-count="headerOptions.chatCount"
        :is-center-title="headerOptions.isCenterTitle"
        :has-add-text="headerOptions.hasAddText"
        :add-text="headerOptions.addText"
        :add-text-click-enabled="headerOptions.addTextClickEnabled"
        :has-add-text-left="headerOptions.hasAddTextLeft"
        :add-text-left="headerOptions.addTextLeft"
        :has-close-btn="headerOptions.hasCloseBtn"
        :is-transparent="headerOptions.isTransparent"
        :white-logo="headerOptions.whiteLogo"
        :has-insu="headerOptions.hasInsu"
        :insu-status="headerOptions.insuStatus"
        :has-my-info="headerOptions.hasMyInfo"
        :has-edit-btn="headerOptions.hasEditBtn"
        :has-tel-btn="headerOptions.hasTelBtn"
        :has-write="headerOptions.hasWrite"
        :has-profile="headerOptions.hasProfile"
        @go-back="handleGoBack"
        @close="handleClose"
        @toggle-sidebar="handleToggleSidebar"
        @add-text-click="handleAddTextClick"
        @edit="handleEditEvent"
        @search="handleSearchEvent"
      >
        <!-- 유틸 컴포넌트 자체를 넣을 수 있는 방법 -->
        <!-- <template #headerUtils> </template> -->
      </BaseHeader>

      <!-- Page -->
      <BasePage :class="{ 'pb-68': showTabbar }" :page-type="headerOptions.pageType">
        <slot></slot>
      </BasePage>

      <!-- Base Bottom Navigation -->
      <BaseTabbar v-if="showTabbar" position="bottom">
        <BaseTabbarItem v-for="tab in tabs" :key="tab.path" :path="tab.path" :icon="tab.icon" :label="tab.label" />
      </BaseTabbar>

      <!-- Sidebar -->
    </BaseLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import BasePage from '@/components/page/BasePage.vue'
import BaseHeader from '@/components/layout/BaseHeader.vue' // 업데이트된 BaseHeader 사용
import BaseTabbar from '~/components/tabbar/BaseTabbar.vue'
import BaseTabbarItem from '~/components/tabbar/BaseTabbarItem.vue'

const route = useRoute()
const router = useRouter()

// 페이지에서 설정할 수 있는 헤더 default 옵션
const headerOptions = ref({
  // 헤더 표시 여부
  showHeader: true,

  // 기본 옵션
  showBackButton: undefined,
  pageTitle: '',
  logoType: 'text',
  logoTypeWithBack: '',
  pageType: '', // 페이지 타입 추가

  //투명 옵션
  backGround: false,

  // 유틸 옵션
  showSearch: false,
  showSearchBtn: false,
  searchWithSelect: false,
  searchSelectOptions: [],
  searchSelectPlaceholder: '전체',

  // 알림 옵션
  hasNotification: false,
  hasNotificationDot: false,
  hasReward: false,
  hasRewardDot: false,
  hasCart: false,

  // 추가 기능 옵션
  hasSetting: false,
  hasSearch: false,
  hasChat: false,
  hasScrap: false, // 스크랩 버튼 표시 여부
  hasShare: false,
  hasMenu: false,
  hasTelBtn: false,

  // 카운트 옵션
  notificationCount: 0,
  chatCount: 0,
  cartCount: 0,

  // 레이아웃 옵션
  isCenterTitle: false,

  // 추가 텍스트 옵션
  hasAddText: false,
  addText: '',
  addTextClickEnabled: false,
  hasAddTextLeft: false,
  addTextLeft: '',

  // 전체화면 모달 옵션
  hasCloseBtn: false,

  // 투명 배경 옵션
  isTransparent: false,

  // 화이트 로고 옵션
  whiteLogo: false,

  // 청구의신 my 병원
  hasInsu: false,
  insuStatus: 'unregistered',

  // 커뮤니티 마이프로필
  hasMyInfo: false,

  // 청구의 신 수정 버튼
  hasEditBtn: false,

  // 글쓰기 버튼
  hasWrite: false,

  // 프로필 버튼
  hasProfile: false
})

// 페이지에서 사용할 수 있도록 provide
provide('setHeaderOptions', (options: Partial<typeof headerOptions.value>) => {
  // 즉시 업데이트
  Object.assign(headerOptions.value, options)

  // nextTick을 사용해 다음 프레임에서 한 번 더 업데이트 (안전장치)
  nextTick(() => {
    Object.assign(headerOptions.value, options)
  })

  // 디버깅용 로그 간소화
  if (options.hasInsu || options.insuStatus) {
    console.log('Header options updated:', {
      hasInsu: options.hasInsu,
      insuStatus: options.insuStatus,
      pageTitle: options.pageTitle
    })
  }
})

// 라우트 변경 감지하여 헤더 상태 리셋
watch(
  () => route.path,
  newPath => {
    // 헤더 옵션 초기화 (기본값으로 리셋)
    headerOptions.value = {
      showHeader: true,
      showBackButton: undefined,
      backGround: false,
      pageTitle: '',
      logoType: 'text',
      logoTypeWithBack: '',
      pageType: '',
      showSearch: false,
      showSearchBtn: false,
      searchWithSelect: false,
      searchSelectOptions: [],
      searchSelectPlaceholder: '전체',
      hasNotification: false,
      hasNotificationDot: false,
      hasCart: false,
      hasReward: false,
      hasRewardDot: false,
      hasSetting: false,
      hasSearch: false,
      hasChat: false,
      hasScrap: false,
      hasShare: false,
      hasMenu: false,
      notificationCount: 0,
      cartCount: 0,
      chatCount: 0,
      isCenterTitle: false,
      hasAddText: false,
      addText: '',
      addTextClickEnabled: false,
      hasAddTextLeft: false,
      addTextLeft: '',
      hasCloseBtn: false,
      isTransparent: false,
      whiteLogo: false,
      hasInsu: false,
      insuStatus: 'unregistered',
      hasMyInfo: false,
      hasEditBtn: false,
      hasTelBtn: false,
      hasWrite: false,
      hasProfile: false
    }
  },
  { immediate: false }
)

// 헤더 제목 설정
const headerTitle = computed(() => {
  // 페이지에서 사용자 정의 제목이 있으면 우선 사용
  if (headerOptions.value.pageTitle) {
    return headerOptions.value.pageTitle
  }

  // 라우트에 따른 동적 제목 설정
  let routeTitle = ''

  // wholeMenu 관련 경로 처리 (하위 경로 포함)
  if (route.path.startsWith('/common/wholeMenu/index')) {
    routeTitle = '메뉴'
  } else {
    switch (route.path) {
      case '/common/home':
        routeTitle = '건강의신'
        break
      case '/walkingKing/subHome':
        routeTitle = '걷기왕'
        break
      case '/community':
        routeTitle = '커뮤니티'
        break
      case '/insu':
        routeTitle = '청구의신'
        break
      case '/guide/PubList':
      case '/guide/layout':
      case '/guide/components':
        routeTitle = '퍼블가이드'
        break
    }
  }

  console.log('headerTitle from route:', route.path, routeTitle)
  return routeTitle
})

// BaseTabbar 표시 여부 결정
const showTabbar = computed(() => {
  // BaseTabbar가 표시될 페이지 경로들
  const tabbarPages = [
    '/common/home',
    '/walkingKing/subHome',
    '/walkingKing/individualChallengeHomeType1',
    '/walkingKing/privateGameHome',
    '/community',
    '/community/diary',
    '/community/familycare',
    '/insu',
    '/common/wholeMenu'
  ]

  const shouldShow = tabbarPages.includes(route.path)

  return shouldShow
})

// 뒤로가기 버튼 표시 여부
const showBackButton = computed(() => {
  // 페이지에서 설정한 값이 있으면 우선 사용
  if (headerOptions.value.showBackButton !== undefined) {
    return headerOptions.value.showBackButton
  }

  // 라우트별 기본값 설정
  const isHomePage = route.path === '/common/home'
  const defaultValue = !isHomePage // 홈 페이지는 false, 나머지는 true

  return defaultValue
})

// 헤더 표시 여부
const showHeader = computed(() => {
  return headerOptions.value.showHeader
})

// 이벤트 핸들러
const handleGoBack = () => {
  router.go(-1) // 브라우저 기본 뒤로가기
}

// 페이지에서 close 핸들러를 등록할 수 있도록 provide
let pageCloseHandler: (() => void) | null = null

provide('setCloseHandler', (handler: () => void) => {
  console.log('default.vue: setCloseHandler called with handler:', handler)
  pageCloseHandler = handler
})

const handleClose = () => {
  // 페이지에서 등록한 close 핸들러가 있으면 실행
  if (pageCloseHandler) {
    console.log('Calling page close handler')
    pageCloseHandler()
  } else {
    // 기본적으로 뒤로가기와 동일하게 처리
    console.log('전체화면 모달 닫기 - 기본 동작')
    router.go(-1)
  }
}

const handleToggleSidebar = () => {
  console.log('사이드바 토글')
  // 사이드바 토글 로직 여기서 구현
}

// 런타임에서 설정된 addTextClick 핸들러
let pageAddTextClickHandler: (() => void) | null = null
// 런타임에서 설정된 search 핸들러
let pageSearchHandler: ((query?: string) => void) | null = null

// addTextClick 상태 관리
const isAddTextClickEnabled = ref(false)

// 페이지에서 addTextClick 핸들러를 등록할 수 있도록 provide
provide('setAddTextClickHandler', (handler: () => void) => {
  console.log('default.vue: setAddTextClickHandler called with handler:', handler)
  pageAddTextClickHandler = handler
  isAddTextClickEnabled.value = true
  console.log('pageAddTextClickHandler updated to:', pageAddTextClickHandler)
})

// 페이지에서 search 핸들러를 등록할 수 있도록 provide
provide('setSearchHandler', (handler: (query?: string) => void) => {
  console.log('default.vue: setSearchHandler called with handler:', handler)
  pageSearchHandler = handler
  console.log('pageSearchHandler updated to:', pageSearchHandler)
})

// addTextClick 상태를 provide
provide('addTextClickEnabled', isAddTextClickEnabled)

const handleAddTextClick = () => {
  console.log('default.vue: handleAddTextClick called')
  console.log('pageAddTextClickHandler:', pageAddTextClickHandler)
  if (pageAddTextClickHandler) {
    console.log('Calling pageAddTextClickHandler')
    pageAddTextClickHandler()
  } else {
    console.log('No addTextClick handler registered')
  }
}

// search 이벤트 핸들러
const handleSearchEvent = searchData => {
  console.log('default.vue: handleSearchEvent called with:', searchData)
  console.log('pageSearchHandler:', pageSearchHandler)
  if (pageSearchHandler) {
    console.log('Calling pageSearchHandler')
    // 객체 또는 문자열 모두 처리
    if (typeof searchData === 'object') {
      pageSearchHandler(searchData.query, searchData.type)
    } else {
      pageSearchHandler(searchData)
    }
  } else {
    console.log('No search handler registered')
  }
}
const modalTriggerSignal = ref(0)
const handleEditEvent = () => {
  modalTriggerSignal.value++
}

const tabs = [
  { path: '/common/home', icon: 'c-home', label: '홈' },
  {
    path: '/walkingKing/subHome',
    icon: 'c-walkiing-king',
    label: '걷기왕'
  },
  {
    path: '/community',
    icon: 'c-community',
    label: '커뮤니티'
  },
  { path: '/insu', icon: 'c-claim-god', label: '청구의신' },
  {
    path: '/common/wholeMenu',
    icon: 'c-whole-menu',
    label: '메뉴'
  }
]
</script>

<style scoped lang="scss">
// TabBar가 있는 페이지에 하단 여백 추가
:deep(.pb-68) {
  padding-bottom: 68px;
}
</style>
