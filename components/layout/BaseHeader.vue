<template>
  <header
    ref="headerRef"
    :class="[
      'c-header',
      {
        h_search: showSearch, // 검색 필드가 있는 경우
        'bg-transparent': isTransparent || title === '건강의신', // 투명 배경 설정 또는 건강의신 home 일 경우
        sticky: isSticky,
        'white-logo': whiteLogo // 화이트 로고 클래스 추가
      }
    ]"
  >
    <div class="c-header-inner">
      <!-- 뒤로가기 버튼 -->
      <button
        v-if="showBackButton && !hasCloseBtn"
        type="button"
        class="c-btn c-icon back"
        aria-label="이전으로 돌아가기"
        @click="$emit('goBack')"
      >
        <i class="icon back" aria-hidden="true"></i>
      </button>

      <!-- 타이틀 -->
      <h1
        :class="[
          'h_title',
          {
            center: isCenterTitle,
            'healthGod-logo': title === '건강의신',
            'search-hidden': showSearch
          }
        ]"
      >
        <strong
          v-if="currentLogoType === 'both' || currentLogoType === 'text'"
          :style="{
            fontSize: (currentLogoType === 'both' && !showBackButton) || showSearch ? '0' : ''
          }"
          >{{ title }}</strong
        >
        <nuxt-link v-if="currentLogoType === 'both' || currentLogoType === 'image'" to="/" title="홈으로 이동">
          <i :title="title" :class="{ 'health-god-icon': title === '건강의신' }"></i>
        </nuxt-link>

        <!-- 타이틀 옆 텍스트 (좌측 정렬) -->
        <span v-if="hasAddTextLeft" class="title-addon-text">
          <!-- 안전한 HTML 렌더링 -->
          <span v-if="isHtmlContent(addTextLeft)" v-html="sanitizeHtml(addTextLeft)"></span>
          <span v-else v-text="addTextLeft"></span>
        </span>
      </h1>

      <!-- 검색창 -->
      <div v-if="showSearch" class="c-header-search-field">
        <div class="search-input-wrapper">
          <!-- Select 컴포넌트 (옵션이 있을 때만 표시) -->
          <Select
            v-if="searchWithSelect && searchSelectOptions.length > 0"
            v-model="searchType"
            :custom-opts="searchSelectOptions"
            :select-placeholder="searchSelectPlaceholder"
            transparent
            class="search-select"
            :is-show-cancel-btn="false"
            :is-show-confirm-btn="true"
            :is-show-close-btn="true"
          />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="!isValid ? '검색 에러 메시지 추가' : '검색어를 입력하세요'"
            class="search-input"
            :class="['c-inp', { 'is-invalid': !isValid, 'with-select': searchWithSelect }]"
            @keyup.enter="handleSearch"
          />
          <button
            v-show="searchQuery.length > 0"
            class="clear-btn"
            type="button"
            aria-label="작성내용 삭제하기"
            @click="clearInput"
          ></button>
          <button type="button" class="search-btn" aria-label="검색" @click="handleSearch">
            <i class="icon ico-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div
        v-if="
          hasNotification ||
          hasCart ||
          hasReward ||
          hasSetting ||
          hasSearch ||
          hasChat ||
          hasAddText ||
          hasShare ||
          hasMenu ||
          hasEditBtn ||
          hasScrap ||
          hasInsu ||
          hasMyInfo ||
          hasTelBtn ||
          hasWrite ||
          hasProfile
        "
        class="c-header-util"
      >
        <!-- 검색 버튼 -->
        <div v-if="hasSearch" class="c-header-search">
          <button type="button" class="c-btn c-icon" aria-label="검색 123" @click="handleSearchMove">
            <i class="icon ico-search" aria-hidden="true"></i>
          </button>
        </div>

        <!-- 전화 버튼 -->
        <div v-if="hasTelBtn" class="c-header-tel">
          <button type="button" class="c-btn c-icon" aria-label="전화연결하기">
            <i class="icon ico-tel" aria-hidden="true"></i>
          </button>
        </div>

        <!-- 공지 버튼 -->
        <div v-if="hasNotification" class="c-header-notice">
          <nuxt-link to="/" title="공지사항으로 이동" class="notification-wrapper">
            <i class="icon ico-notice" aria-label="hidden"></i>
            <span v-if="notificationCount > 0" class="count-badge">{{
              notificationCount > 99 ? '99+' : notificationCount
            }}</span>
          </nuxt-link>
        </div>

        <!-- 장바구니 버튼 -->
        <div v-if="hasCart" class="c-header-cart">
          <nuxt-link to="/insu/claim/documentIssuance/selectDocument" title="장바구니로 이동" class="cart-wrapper">
            <i class="icon ico-cart" aria-label="hidden"></i>
            <span v-if="cartCount > 0" class="count-badge">{{ cartCount > 99 ? '99+' : cartCount }}</span>
          </nuxt-link>
        </div>

        <!-- 스크랩 버튼 -->
        <div v-if="hasScrap" class="c-header-scrap">
          <button type="button" class="c-btn c-icon" aria-label="스크랩하기" @click="handleScrap">
            <i class="icon ico-scrap" :class="{ scraped: isScraped }" aria-hidden="true"></i>
          </button>
        </div>

        <!-- 공유 버튼 -->
        <div v-if="hasShare" class="c-header-share">
          <button type="button" class="c-btn c-icon" aria-label="공유하기">
            <i class="icon ico-share" aria-hidden="true"></i>
          </button>
        </div>

        <!-- 일반 텍스트 -->
        <div v-if="hasAddText" class="c-header-text">
          <button type="button" class="add-text-btn" @click="handleAddTextClick">
            <!-- 안전한 HTML 렌더링: 필요한 경우 sanitizeHtml 함수 사용 -->
            <span v-if="isHtmlContent(addText)" v-html="sanitizeHtml(addText)"></span>
            <span v-else v-text="addText"></span>
          </button>
        </div>

        <!-- 리워드 버튼 -->
        <div v-if="hasReward" class="c-header-reward">
          <nuxt-link to="/" title="리워드페이지로 이동">
            <i class="icon ico-reward" aria-label="hidden"></i>
          </nuxt-link>
        </div>

        <!-- 채팅 버튼 -->
        <div v-if="hasChat" class="c-header-chat">
          <nuxt-link to="/chat" title="채팅페이지로 이동" class="chat-wrapper">
            <i class="icon ico-chat" aria-label="채팅"></i>
            <span v-if="chatCount > 0" class="count-badge">{{ chatCount > 99 ? '99+' : chatCount }}</span>
          </nuxt-link>
        </div>

        <!-- 설정 버튼 -->
        <div v-if="hasSetting" class="c-header-setting">
          <nuxt-link to="/setting" title="설정페이지로 이동">
            <i class="icon ico-setting" aria-label="설정"></i>
          </nuxt-link>
        </div>

        <!-- 메뉴 버튼 -->
        <div v-if="hasMenu" class="c-header-menu">
          <button type="button" class="c-btn c-icon" aria-label="메뉴" @click="handleAddTextClick">
            <i class="icon ico-menu" aria-hidden="true"></i>
          </button>
        </div>

        <!-- 수정 버튼 -->
        <div v-if="hasEditBtn" class="c-header-edit">
          <button type="button" class="c-btn c-icon" aria-label="편집" @click="handleModifyBtnClick">
            <i class="icon ico-edit" aria-label="편집"></i>
          </button>
        </div>

        <!-- MY병원 버튼 (청구의신) -->
        <div v-if="hasInsu" class="c-header-myHospital">
          <!-- 미등록 상태 -->
          <button
            v-if="insuStatus === 'unregistered'"
            type="button"
            class="c-btn c-icon"
            aria-label="my병원 등록하기"
            @click="$emit('insuAction', 'register')"
          >
            <i class="icon ico-myHospital-regist" aria-hidden="true"></i>
          </button>

          <!-- 업데이트 필요 상태 -->
          <button
            v-else-if="insuStatus === 'needUpdate'"
            type="button"
            class="c-btn c-icon"
            aria-label="my병원 업데이트하기"
            @click="$emit('insuAction', 'update')"
          >
            <i class="icon ico-myHospital-update" aria-hidden="true"></i>
          </button>

          <!-- 등록 완료 상태 -->
          <button
            v-else-if="insuStatus === 'registered'"
            type="button"
            class="c-btn c-icon"
            aria-label="my병원으로 이동하기"
            @click="$emit('insuAction', 'navigate')"
          >
            <i class="icon ico-myHospital" aria-hidden="true"></i>
          </button>

          <!-- 툴팁 (미등록 또는 업데이트 필요 상태에서 표시) -->
          <div
            v-if="(insuStatus === 'unregistered' || insuStatus === 'needUpdate') && isTooltipVisible"
            class="myHospital-tooltip"
          >
            <span class="tooltip-text">
              {{ insuStatus === 'unregistered' ? 'MY병원을 등록하세요' : 'MY병원 정보를 업데이트하세요' }}
            </span>
            <button type="button" class="btn-close" aria-label="툴팁 닫기" @click="hideTooltip">
              <i class="icon-close" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <!-- 내정보 영역 -->
        <div v-if="hasMyInfo" class="c-header-myInfo">
          <button type="button" class="myInfo-btn" aria-label="내정보 보기" @click="handleMyInfoClick">
            <!-- 프로필 이미지 -->
            <div class="profile-image">
              <img
                v-if="myInfo.profileImage"
                :src="myInfo.profileImage"
                :alt="myInfo.name || '사용자'"
                class="profile-img"
              />
              <div v-else class="default-profile">
                <i class="icon-profile" aria-hidden="true"></i>
              </div>
            </div>
          </button>
        </div>

        <!-- 글쓰기 버튼 -->
        <div v-if="hasWrite" class="c-header-write">
          <button type="button" class="c-btn c-icon" aria-label="글쓰기" @click="handleWriteClick">
            <i class="icon ico-head-write" aria-hidden="true"></i>
          </button>
        </div>

        <!-- 프로필 버튼 -->
        <div v-if="hasProfile" class="c-header-profile">
          <button type="button" class="c-btn c-icon" aria-label="프로필" @click="handleProfileClick">
            <i class="icon ico-profile" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <!-- 닫기 버튼 (전체화면 모달용) -->
      <button
        v-if="hasCloseBtn"
        type="button"
        class="c-btn icon close"
        aria-label="닫기"
        @click="$emit('close')"
      ></button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineProps, defineEmits, watch } from 'vue'
import Select from '~/components/publishing/input/Select.vue'

// 검색창 inValid 간단 테스트
const isValid = ref(true)

const props = defineProps({
  pageType: { type: String, default: '' },
  backGround: { type: String, default: '' }, //background trans 투명 타입
  title: { type: String, default: 'Title' }, // 기본 타이틀
  logoType: { type: String, default: 'text' }, // "both", "text", "image" 중 하나
  logoTypeWithBack: { type: String, default: '' }, // 뒤로가기 버튼 있을 때의 logoType
  showBackButton: { type: Boolean, default: true }, // 뒤로가기 버튼 표시 여부

  showSearch: { type: Boolean, default: false }, // 검색 필드 표시 여부
  showSearchBtn: { type: Boolean, default: false }, // 검색 버튼 표시
  searchWithSelect: { type: Boolean, default: false }, // 검색창에 Select 포함 여부
  searchSelectOptions: { type: Array, default: () => [] }, // Select 옵션들
  searchSelectPlaceholder: { type: String, default: '전체' }, // Select placeholder

  hasNotification: { type: Boolean, default: false }, // 공지 버튼 표시 여부
  hasNotificationDot: { type: Boolean, default: false }, // 공지 알림 여부
  notificationCount: { type: Number, default: 0 }, // 공지 갯수

  hasCart: { type: Boolean, default: false }, // 장바구니 버튼 표시 여부
  cartCount: { type: Number, default: 0 }, // 장바구니 갯수

  hasReward: { type: Boolean, default: false }, // 리워드 버튼표시 여부
  hasRewardDot: { type: Boolean, default: false }, // 리워드 갯수 여부

  hasScrap: { type: Boolean, default: false }, // 스크랩 버튼 표시 여부
  isScrapedInitial: { type: Boolean, default: false }, // 스크랩 초기 상태
  hasSetting: { type: Boolean, default: false }, // 설정 버튼 표시 여부
  hasSearch: { type: Boolean, default: false }, // 검색 버튼 표시 여부
  hasChat: { type: Boolean, default: false }, // 채팅 버튼 표시 여부
  chatCount: { type: Number, default: 0 }, // 채팅 갯수
  hasShare: { type: Boolean, default: false }, // 공유 버튼 표시 여부
  hasMenu: { type: Boolean, default: false }, // 메뉴 버튼 표시 여부
  hasEditBtn: { type: Boolean, default: false }, // 메뉴 버튼 표시 여부
  hasTelBtn: { type: Boolean, default: false }, // 전화 버튼 표시 여부
  hasAddText: { type: Boolean, default: false }, // 일반 텍스트 추가 여부 (우측)
  addText: { type: String, default: '' }, // 일반 텍스트 내용 (우측)
  addTextClickEnabled: { type: Boolean, default: false }, // addText 클릭 활성화 여부

  hasAddTextLeft: { type: Boolean, default: false }, // 일반 텍스트 추가 여부 (좌측)
  addTextLeft: { type: String, default: '' }, // 일반 텍스트 내용 (좌측)

  isCenterTitle: { type: Boolean, default: false }, // 타이틀 가운데 정렬 여부

  hasCloseBtn: { type: Boolean, default: false }, // 전체화면 모달 닫기 버튼

  isTransparent: { type: Boolean, default: false }, // 투명 배경 여부
  whiteLogo: { type: Boolean, default: false }, // 화이트 로고 여부

  hasInsu: { type: Boolean, default: false }, // 청구의신 MY병원 버튼 표시 여부
  insuStatus: { type: String, default: 'unregistered' }, // 'unregistered', 'needUpdate', 'registered'

  hasMyInfo: { type: Boolean, default: false }, // 내정보 영역 표시 여부
  myInfo: {
    type: Object,
    default: () => ({
      name: '',
      profileImage: '',
      level: '',
      points: 0
    })
  }, // 사용자 정보
  hasWrite: { type: Boolean, default: false }, // 글쓰기 버튼 표시 여부
  hasProfile: { type: Boolean, default: false } // 프로필 버튼 표시 여부
})

// console.log('BaseHeader props received:', props)

const emit = defineEmits([
  'toggleSidebar',
  'goBack',
  'close',
  'search',
  'addTextClick',
  'scrap',
  'insuAction',
  'myInfoClick',
  'edit-clicked'
])

const searchQuery = ref('')
const searchType = ref('') // Select로 선택된 검색 타입
const isSticky = ref(false)
const headerRef = ref(null)
const isTooltipVisible = ref(true) // 툴팁 표시 상태
let headerHeight = 0

// 검색 placeholder 생성 함수
const getSearchPlaceholder = () => {
  if (!isValid.value) return '검색 에러 메시지 추가'

  if (props.searchWithSelect && searchType.value) {
    const selectedOption = props.searchSelectOptions.find(opt => opt.value === searchType.value)
    if (selectedOption) {
      return `${selectedOption.label}로 검색`
    }
  }

  return '검색어를 입력하세요'
}

// searchType 초기값 설정
watch(
  () => props.searchSelectOptions,
  newOptions => {
    if (newOptions && newOptions.length > 0 && !searchType.value) {
      searchType.value = newOptions[0]?.value || ''
    }
  },
  { immediate: true }
)

// 검색 처리 함수 (검색창 내)
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('BaseHeader: handleSearch called with:', {
      query: searchQuery.value.trim(),
      type: searchType.value
    })
    // searchType도 함께 전달
    emit('search', {
      query: searchQuery.value.trim(),
      type: searchType.value
    })
  }
}

// 검색 버튼 클릭 처리 함수 (헤더 유틸리티)
const handleSearchMove = () => {
  console.log('BaseHeader: handleSearchClick called')
  emit('search')
}

// 입력값 삭제 함수
const clearInput = () => {
  searchQuery.value = ''
}

// addText 클릭 처리 함수
const handleAddTextClick = () => {
  console.log('BaseHeader: handleAddTextClick called')
  if (props.addTextClickEnabled) {
    emit('addTextClick')
  }
}
// 편집 버튼 클릭 처리 함수
const handleModifyBtnClick = () => {
  emit('edit-clicked')
}
//스크랩 상태 관리
const isScraped = ref(props.isScrapedInitial)
// 스크랩 버튼 클릭 처리 함수
const handleScrap = () => {
  console.log('BaseHeader: handleScrap called')
  isScraped.value = !isScraped.value
  emit('scrap', isScraped.value)
}

// 툴팁 숨기기 함수
const hideTooltip = () => {
  isTooltipVisible.value = false
}

// myInfo 클릭 처리 함수
const handleMyInfoClick = () => {
  // 내정보 클릭 처리
  console.log('내정보 클릭')
  // TODO: 내정보 페이지로 이동 또는 모달 표시
}

const handleWriteClick = () => {
  // 글쓰기 클릭 처리
  console.log('글쓰기 클릭')
  // TODO: 글쓰기 페이지로 이동 또는 모달 표시
}

const handleProfileClick = () => {
  // 프로필 클릭 처리
  console.log('프로필 클릭')
  // TODO: 프로필 페이지로 이동 또는 모달 표시
}

// HTML 컨텐트 판별 함수
const isHtmlContent = text => {
  return text && (text.includes('<') || text.includes('>'))
}

// HTML 살니타이즈 함수 (기본적인 태그만 허용)
const sanitizeHtml = html => {
  if (!html) return ''

  // 허용된 태그만 남기고 나머지는 제거
  const allowedTags = ['strong', 'b', 'em', 'i', 'span', 'br']
  const tagRegex = /<\/?([a-zA-Z]+)[^>]*>/g

  return html.replace(tagRegex, (match, tagName) => {
    if (allowedTags.includes(tagName.toLowerCase())) {
      // script, onclick 등 위험한 속성 제거
      return match.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '').replace(/javascript\s*:/gi, '')
    }
    return '' // 허용되지 않은 태그는 제거
  })
}

// 상태 변경 시 툴팁 다시 표시
watch(
  () => props.insuStatus,
  newStatus => {
    if (newStatus === 'unregistered' || newStatus === 'needUpdate') {
      isTooltipVisible.value = true
    }
  }
)

// 뒤로가기 버튼 상태에 따라 logoType 결정
const currentLogoType = computed(() => {
  if (props.showBackButton && props.logoTypeWithBack) {
    return props.logoTypeWithBack
  }
  return props.logoType
})

// 스크롤 이벤트 핸들러
const handleScroll = () => {
  const scrollY = window.scrollY
  isSticky.value = scrollY >= headerHeight
}

// 생명주기 훅들
onMounted(() => {
  // 헤더 높이 측정
  if (headerRef.value) {
    headerHeight = headerRef.value.offsetHeight
  }

  // 스크롤 이벤트 리스너 추가
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  // 스크롤 이벤트 리스너 제거
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
/* S : Header */
.c-header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: vars.$header-height;
  background-color: rgb(var(--white));
  transition: 0.3s background cubic-bezier(0.075, 0.82, 0.165, 1);
  &.bg-transparent {
    background-color: transparent;
  }
  &.sticky {
    background-color: rgba($color: #ffffff, $alpha: 0.8);
  }
  .h_title {
    display: flex;
    align-items: center;
    height: 3.4rem;
    line-height: 3.5rem;
    font-size: 1.8rem;
    font-weight: vars.$bold;
    letter-spacing: -0.036rem;
    gap: 0.8rem; // 타이틀과 추가 텍스트 사이 간격

    // 타이틀 옆 추가 텍스트 스타일
    .title-addon-text {
      font-size: 1.4rem;
      font-weight: 500;
      color: #666;

      // HTML 태그 스타일링
      span {
        position: relative;
        top: 0.1rem;
        font-size: inherit;
        color: inherit;
      }

      small {
        font-size: 1.2rem;
        color: #999;
      }

      strong {
        font-weight: 700;
        color: #333;
      }
    }

    // 건강의신 타이틀 전용 스타일
    .health-god-icon {
      display: inline-block;
      width: 9.5rem;
      height: 2.2rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
    &.center {
      flex: 1;
      justify-content: center;
      text-align: center;
      padding-right: 0;
    }

    &.search-hidden {
      position: absolute;
      z-index: -1;
      color: transparent;
    }
  }

  // 검색창 스타일
  .c-header-search-field {
    flex: 1;

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      border-radius: 0.8rem;
      padding: 0.5rem 1.6rem;
      padding-right: 1rem;
      flex-wrap: nowrap;

      &:has(.is-invalid) {
        border: 0.1rem solid #f14960;
        .search-input::placeholder {
          color: #f14960;
        }
      }

      // Select 컴포넌트 스타일
      .search-select {
        flex: 0 0 auto;
        width: 8rem;
        margin-right: 0.8rem;
      }

      // 구분선
      .search-divider {
        width: 0.1rem;
        height: 2rem;
        background-color: #e2e2e2;
        margin: 0 1.2rem;
        flex-shrink: 0;
      }

      .search-input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: 1.6rem;
        line-height: 1;
        outline: none;
        width: 100%;
        min-width: 0;

        &.with-select {
          font-size: 1.4rem; // Select가 있을 때 조금 작게
        }

        &::placeholder {
          color: #999;
        }
      }

      .search-btn {
        background: none;
        border: none;
        padding: 0.5rem;
        margin-left: 0.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .icon {
          width: 2rem;
          height: 2rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      }

      .clear-btn {
        flex-shrink: 0;
      }
    }
  }

  .c-header-util {
    // overflow: hidden;
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 1.6rem;
    .c-header-notice,
    .c-header-cart,
    .c-header-reward,
    .c-header-setting,
    .c-header-search,
    .c-header-chat,
    .c-header-scrap,
    .c-header-share,
    .c-header-edit,
    .c-header-tel,
    .c-header-menu,
    .c-header-write,
    .c-header-profile {
      font-size: 0;
      position: relative;
      .notification-wrapper,
      .cart-wrapper,
      .chat-wrapper {
        position: relative;
        display: inline-block;
      }

      .icon {
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      .c-btn.c-icon {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
      }

      .count-badge {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        background-color: #f14960;
        color: white;
        border-radius: 50%;
        border: 0.15rem solid vars.$white;
        font-size: 1rem;
        font-weight: 600;
        line-height: 1;
        width: 1.7rem;
        line-height: 1.7rem;
        height: 1.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .c-header-text {
      font-size: 1.4rem;
      color: #555555;
      font-weight: 500;
      // margin-right: 0.4rem;

      .add-text-btn {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-size: inherit;
        color: inherit;
        font-weight: inherit;

        // &:hover {
        //   opacity: 0.7;
        // }

        &:active {
          transform: scale(0.98);
        }
        .icon {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          &.ico-edit,
          &.ico-menu {
            width: 2.4rem;
            height: 2.4rem;
          }
        }
      }

      span {
        display: inline-flex;
        gap: 0 0.4rem;
        font-size: 1.4rem;
        font-weight: 600;
        a {
          color: inherit;
          text-decoration: none;
          display: inline-flex;
          gap: 0 0.4rem;
        }

        strong {
          font-weight: 700;
        }
        .icon-arrow {
          width: 2.4rem;
          height: 2.4rem;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10L12.0008 14.58L17 10' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        }
        .ico-menu {
          width: 2.4rem;
          height: 2.4rem;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'%3E%3Ccircle cx='13.2285' cy='5.5' r='1.5' fill='%232B2B2B'/%3E%3Ccircle cx='13.2285' cy='12.5' r='1.5' fill='%232B2B2B'/%3E%3Ccircle cx='13.2285' cy='19.5' r='1.5' fill='%232B2B2B'/%3E%3C/svg%3E");
          font-size: 0;
        }
      }
    }
  }
  .c-header-inner {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    &:has(.c-badge) {
      padding-right: 0;
      .h_title {
        align-items: flex-end;
      }
      .c-btn.c-icon {
        align-items: flex-end;
        justify-content: flex-start;
      }
    }
  }
  &.h_search {
    .h_title {
      position: absolute;
      z-index: -1;
      color: transparent;
    }
  }
  &.is-shadow {
    box-shadow: var(--c-header-shadow);
  }
  &:has(.c-header-util) {
    .h_title.center {
      padding-right: 0;
    }
  }
  &:has(+ main .is-sticky) {
    box-shadow: unset;
  }
  // contents 상단에 고정으로 된 부분이 있는경우 header shadow 제거 search_head에 추가
  &:has(+ .l-page .chead .search_head) {
    &.is-shadow {
      box-shadow: none;
      + .l-page .chead .search_head {
        box-shadow: var(--c-header-shadow);
      }
    }
    + .l-page .cbody {
      margin-top: 4.5rem;
    }
  }
  // contents 상단에 tabs 가 고정인 경우
  &:has(+ .l-page > .c-tabs.box) {
    &.is-shadow {
      box-shadow: none;
      + .l-page > .c-tabs.box {
        box-shadow: var(--c-header-shadow);
      }
    }
  }

  // 화이트 로고 스타일
  &.white-logo {
    .h_title {
      color: white;

      strong {
        color: white;
      }

      .title-addon-text {
        color: rgba(255, 255, 255, 0.8);

        span,
        small,
        strong {
          color: inherit;
        }
      }

      // 건강의신 로고 아이콘을 화이트 버전으로 변경
      .health-god-icon {
        filter: brightness(0) invert(1); // 아이콘을 하얀게 변경
      }
    }

    // 뒤로가기 버튼 아이콘도 화이트로
    .c-btn.c-icon.back i.icon.back {
      filter: brightness(0) invert(1);
    }

    // 닫기 버튼 아이콘도 화이트로
    .c-btn.close {
      filter: brightness(0) invert(1);
    }

    // 헤더 유틸 아이콘들도 화이트로
    .c-header-util {
      .icon {
        filter: brightness(0) invert(1);
      }

      .c-header-text {
        color: white;

        .add-text-btn {
          color: white;
        }
      }
    }
    &.sticky {
      .h_title {
        color: #2b2b2b;

        strong {
          color: #2b2b2b;
        }
      }
      .c-header-util {
        .icon {
          filter: brightness(1) invert(0);
        }

        .c-header-text {
          color: #2b2b2b;

          .add-text-btn {
            color: #2b2b2b;
          }
        }
      }
    }
  }
  .c-btn.c-icon.back {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.6rem;
    background-color: transparent;
    border: none;
    margin-left: -0.4rem;
    cursor: pointer;
    i.icon.back {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }

  .c-btn.close {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;

  flex-shrink: 0; /* 버튼이 찌그러지지 않도록 */
  z-index: 10;
  position: relative;
  background-size: 2rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.c-header-myHospital {
  position: relative;
  .c-icon {
    .icon {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      &.ico-myHospital {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M2.40002 21.6004L2.40043 18C2.40065 16.0119 4.01236 14.4004 6.00043 14.4004H12.6M14.4 6.00039C14.4 7.98862 12.7882 9.60039 10.8 9.60039C8.8118 9.60039 7.20002 7.98862 7.20002 6.00039C7.20002 4.01217 8.8118 2.40039 10.8 2.40039C12.7882 2.40039 14.4 4.01217 14.4 6.00039Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.5 20C19.8807 20 21 18.8807 21 17.5C21 16.1193 19.8807 15 18.5 15C18.0446 15 17.6178 15.1217 17.25 15.3345C16.5027 15.7667 16 16.5746 16 17.5C16 18.4254 16.5027 19.2333 17.25 19.6655C17.6178 19.8783 18.0446 20 18.5 20Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.5 21C20.433 21 22 19.433 22 17.5C22 15.5669 20.433 14 18.5 14C16.5669 14 15 15.5669 15 17.5C15 19.433 16.5669 21 18.5 21Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' stroke-dasharray='0.3 2'/%3E%3C/svg%3E");
      }
      &.ico-myHospital-update {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M2.40002 21.6004L2.40043 18C2.40065 16.0119 4.01236 14.4004 6.00043 14.4004H12.6M14.4 6.00039C14.4 7.98862 12.7882 9.60039 10.8 9.60039C8.8118 9.60039 7.20002 7.98862 7.20002 6.00039C7.20002 4.01217 8.8118 2.40039 10.8 2.40039C12.7882 2.40039 14.4 4.01217 14.4 6.00039Z' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21.6664 16.6667C21.0476 15.097 19.6345 14 17.9901 14C16.2318 14 14.7377 15.2545 14.1968 17' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M19.9951 16.6665H21.6664C21.8507 16.6665 22.0001 16.5171 22.0001 16.3328V14.4443' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14.3336 19.3333C14.9524 20.903 16.3655 22 18.0099 22C19.7682 22 21.2623 20.7455 21.8032 19' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M16.0049 19.333H14.3336C14.1493 19.333 13.9999 19.4824 13.9999 19.6667V21.5552' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      }
      &.ico-myHospital-regist {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M1.65002 21.6003C1.64998 22.0145 1.98573 22.3503 2.39994 22.3504C2.81415 22.3504 3.14998 22.0147 3.15002 21.6005L1.65002 21.6003ZM2.40043 18L3.15043 18.0001L2.40043 18ZM12.6 15.1504C13.0142 15.1504 13.35 14.8146 13.35 14.4004C13.35 13.9862 13.0142 13.6504 12.6 13.6504V15.1504ZM21.6 16.3504C22.0142 16.3504 22.35 16.0146 22.35 15.6004C22.35 15.1862 22.0142 14.8504 21.6 14.8504V16.3504ZM16.2 14.8504C15.7858 14.8504 15.45 15.1862 15.45 15.6004C15.45 16.0146 15.7858 16.3504 16.2 16.3504V14.8504ZM18.15 18.3002C18.15 18.7145 18.4858 19.0502 18.9 19.0502C19.3142 19.0502 19.65 18.7145 19.65 18.3002H18.15ZM19.65 12.9002C19.65 12.486 19.3142 12.1502 18.9 12.1502C18.4858 12.1502 18.15 12.486 18.15 12.9002H19.65ZM14.4 6.00039H13.65C13.65 7.5744 12.374 8.85039 10.8 8.85039V9.60039V10.3504C13.2025 10.3504 15.15 8.40283 15.15 6.00039H14.4ZM10.8 9.60039V8.85039C9.22601 8.85039 7.95002 7.5744 7.95002 6.00039H7.20002H6.45002C6.45002 8.40283 8.39758 10.3504 10.8 10.3504V9.60039ZM7.20002 6.00039H7.95002C7.95002 4.42638 9.22601 3.15039 10.8 3.15039V2.40039V1.65039C8.39758 1.65039 6.45002 3.59795 6.45002 6.00039H7.20002ZM10.8 2.40039V3.15039C12.374 3.15039 13.65 4.42638 13.65 6.00039H14.4H15.15C15.15 3.59795 13.2025 1.65039 10.8 1.65039V2.40039ZM2.40002 21.6004L3.15002 21.6005L3.15043 18.0001L2.40043 18L1.65043 17.9999L1.65002 21.6003L2.40002 21.6004ZM6.00043 14.4004V13.6504C3.59818 13.6504 1.6507 15.5977 1.65043 17.9999L2.40043 18L3.15043 18.0001C3.15061 16.4262 4.42654 15.1504 6.00043 15.1504V14.4004ZM6.00043 14.4004V15.1504H12.6V14.4004V13.6504H6.00043V14.4004ZM21.6 15.6004V14.8504H18.9V15.6004V16.3504H21.6V15.6004ZM18.9 15.6004V14.8504H16.2V15.6004V16.3504H18.9V15.6004ZM18.9 18.3002H19.65V15.6004H18.9H18.15V18.3002H18.9ZM18.9 15.6004H19.65V12.9002H18.9H18.15V15.6004H18.9Z' fill='%232B2B2B'/%3E%3C/svg%3E");
      }
    }
  }
  .myHospital-tooltip {
    position: absolute;
    top: 100%;
    right: -0.5rem;
    margin-top: 1.2rem;
    padding: 0.4rem 0.8rem;
    background: #4f5561;
    color: #ffffff;
    border-radius: 3.2rem;
    white-space: nowrap;
    z-index: 100;
    display: flex;
    align-items: center;

    // 말풍선 화살표
    &::before {
      content: '';
      position: absolute;
      top: -0.4rem;
      right: 1rem;
      width: 1.2rem;
      height: 0.4rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='4' viewBox='0 0 12 4' fill='none'%3E%3Cg clip-path='url(%23clip0_15671_3851)'%3E%3Cpath d='M4.35905 1.04348C5.08836 -0.347828 6.91164 -0.347825 7.64095 1.04348L11.7433 8.86957C12.4726 10.2609 11.561 12 10.1024 12H1.89763C0.439007 12 -0.472627 10.2609 0.256683 8.86957L4.35905 1.04348Z' fill='%234F5561'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_15671_3851'%3E%3Crect width='12' height='4' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
    }

    .tooltip-text {
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.6rem;
      margin-right: 0.4rem;
      white-space: nowrap;
    }

    .btn-close {
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      .icon-close {
        width: 1.2rem;
        height: 1.2rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M9 3L3 9M9 9L3 3' stroke='%23D5D5D5' stroke-linecap='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      &:hover {
        opacity: 0.7;
      }
    }
  }
}
// 마이프로필 노출
.c-header-myInfo {
  .myInfo-btn {
    display: flex;
    align-items: center;

    .profile-image {
      flex-shrink: 0;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      overflow: hidden;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;

      .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .default-profile {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e0e0e0;

        .icon-profile {
          width: 1.8rem;
          height: 1.8rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z' fill='%23999999'/%3E%3Cpath d='M9 9.75C6.51472 9.75 4.5 11.7647 4.5 14.25C4.5 14.6642 4.83579 15 5.25 15H12.75C13.1642 15 13.5 14.6642 13.5 14.25C13.5 11.7647 11.4853 9.75 9 9.75Z' fill='%23999999'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
      }
    }
  }
}
/* E : Header */
</style>
