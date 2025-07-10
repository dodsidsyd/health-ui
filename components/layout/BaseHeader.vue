<template>
  <header
    ref="headerRef"
    :class="[
      'c-header',
      {
        h_search: showSearch, // 검색 필드가 있는 경우
        'bg-transparent': isTransparent || title === '건강의신', // 투명 배경 설정 또는 건강의신 home 일 경우
        sticky: isSticky
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
        <span v-if="hasAddTextLeft" class="title-addon-text" v-html="addTextLeft"></span>
      </h1>

      <!-- 검색창 -->
      <div v-if="showSearch" class="c-header-search-field">
        <div class="search-input-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="검색어를 입력하세요"
            class="search-input"
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
        v-if="hasNotification || hasReward || hasSetting || hasSearch || hasChat || hasAddText || hasShare || hasMenu"
        class="c-header-util"
      >
        <!-- 검색 버튼 -->
        <div v-if="hasSearch" class="c-header-search">
          <button type="button" class="c-btn c-icon" aria-label="검색" @click="$emit('search')">
            <i class="icon ico-search" aria-hidden="true"></i>
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

        <!-- 공유 버튼 -->
        <div v-if="hasShare" class="c-header-share">
          <button type="button" class="c-btn c-icon" aria-label="공유하기">
            <i class="icon ico-share" aria-hidden="true"></i>
          </button>
        </div>

        <!-- 일반 텍스트 -->
        <div v-if="hasAddText" class="c-header-text">
          <button type="button" class="add-text-btn" @click="handleAddTextClick">
            <span v-html="addText"></span>
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

        <!-- 공유 버튼 -->
        <div v-if="hasMenu" class="c-header-menu">
          <button type="button" class="c-btn c-icon" aria-label="메뉴 보이기">
            <i class="icon ico-menu" aria-hidden="true"></i>
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
import { ref, computed, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'

const props = defineProps({
  pageType: { type: String, default: '' },
  backGround: { type: String, default: '' }, //background trans 투명 타입
  title: { type: String, default: 'Title' }, // 기본 타이틀
  logoType: { type: String, default: 'text' }, // "both", "text", "image" 중 하나
  logoTypeWithBack: { type: String, default: '' }, // 뒤로가기 버튼 있을 때의 logoType
  showBackButton: { type: Boolean, default: true }, // 뒤로가기 버튼 표시 여부

  showSearch: { type: Boolean, default: false }, // 검색 필드 표시 여부
  showSearchBtn: { type: Boolean, default: false }, // 검색 버튼 표시

  hasNotification: { type: Boolean, default: false }, // 공지 버튼 표시 여부
  hasNotificationDot: { type: Boolean, default: false }, // 공지 알림 여부
  notificationCount: { type: Number, default: 0 }, // 공지 갯수

  hasReward: { type: Boolean, default: false }, // 리워드 버튼표시 여부
  hasRewardDot: { type: Boolean, default: false }, // 리워드 갯수 여부

  hasSetting: { type: Boolean, default: false }, // 설정 버튼 표시 여부
  hasSearch: { type: Boolean, default: false }, // 검색 버튼 표시 여부
  hasChat: { type: Boolean, default: false }, // 채팅 버튼 표시 여부
  chatCount: { type: Number, default: 0 }, // 채팅 갯수
  hasShare: { type: Boolean, default: false }, // 공유 버튼 표시 여부
  hasMenu: { type: Boolean, default: false }, // 메뉴 버튼 표시 여부

  hasAddText: { type: Boolean, default: false }, // 일반 텍스트 추가 여부 (우측)
  addText: { type: String, default: '' }, // 일반 텍스트 내용 (우측)

  hasAddTextLeft: { type: Boolean, default: false }, // 일반 텍스트 추가 여부 (좌측)
  addTextLeft: { type: String, default: '' }, // 일반 텍스트 내용 (좌측)

  isCenterTitle: { type: Boolean, default: false }, // 타이틀 가운데 정렬 여부

  hasCloseBtn: { type: Boolean, default: false }, // 전체화면 모달 닫기 버튼

  isTransparent: { type: Boolean, default: false } // 투명 배경 여부
})

// console.log('BaseHeader props received:', props)

const emit = defineEmits(['toggleSidebar', 'goBack', 'close', 'search', 'addTextClick'])

const searchQuery = ref('')
const isSticky = ref(false)
const headerRef = ref(null)
let headerHeight = 0

// 검색 처리 함수
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}

// 입력값 삭제 함수
const clearInput = () => {
  searchQuery.value = ''
}

// addText 클릭 처리 함수
const handleAddTextClick = () => {
  console.log('BaseHeader: handleAddTextClick called')
  emit('addTextClick')
}

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
      flex-wrap: wrap;
      .search-input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: 1.6rem;
        line-height: 1;
        outline: none;
        min-width: 0;
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

        .icon {
          width: 2rem;
          height: 2rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
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
    .c-header-reward,
    .c-header-setting,
    .c-header-search,
    .c-header-chat,
    .c-header-share,
    .c-header-menu {
      font-size: 0;
      position: relative;

      .notification-wrapper,
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

        &:hover {
          opacity: 0.7;
        }

        &:active {
          transform: scale(0.98);
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
/* E : Header */
</style>
