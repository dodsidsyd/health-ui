<template>
  <div v-if="notifications.length" class="stacked-banner">
    <!-- 스택형 배너들 -->
    <div v-if="isBannerStackVisible" class="banner-stack">
      <div
        v-for="(notification, index) in visibleNotifications"
        :key="notification.id"
        class="banner-item"
        :class="{
          'top-banner': index === 0,
          'second-banner': index === 1,
          'third-banner': index === 2,
          'single-banner': notifications.length === 1 && index === 0
        }"
        :style="getBannerStyle(index)"
        @click="handleBannerClick(notification, index)"
      >
        <div class="banner-content">
          <div class="banner-icon">
            <i class="icon-bell"><img :src="src" alt="" /></i>
          </div>
          <div class="banner-text">
            <p class="banner-title">{{ notification.author || '실손청구 노하우' }}</p>
            <p class="banner-message">{{ notification.message || '내 게시물에 댓글이 달렸어요' }}</p>
          </div>
        </div>

        <!-- 카운터 (맨 위 배너에만 표시) -->
        <div v-if="index === 0 && notifications.length > 1" class="banner-counter">
          {{ notifications.length }}
        </div>
      </div>
    </div>

    <!-- 확장된 리스트 (아래로 펼쳐짐) -->
    <div v-if="isExpanded" class="expanded-list">
      <div class="notification-list">
        <div
          v-for="notification in displayNotifications"
          :key="notification.id"
          class="notification-item"
          @click="handleNotificationClick(notification.postId)"
        >
          <div class="notification-icon">
            <i class="icon-bell"><img :src="src" alt="" /></i>
          </div>
          <div class="notification-content">
            <p class="notification-title">{{ notification.communityName }}</p>
            <p class="notification-message">{{ notification.message }}</p>
            <!-- <p class="notification-time">{{ notification.time }}</p> -->
          </div>
        </div>
      </div>

      <!-- 전체보기 버튼 -->
      <div v-if="notifications.length > 5" class="view-all-section">
        <Button
          btn-type="line"
          element-type="a"
          href="#"
          :aria-label="buttonAriaLabel"
          @click="handleAllNotificationsClick"
          class="view-all-btn xs"
        >
          전체알림보기 <span class="count">+{{ notifications.length - 5 }}</span>
        </Button>

        <button @click="handleCloseClick" class="close-btn">
          <i class="icon-chevron-up"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
interface Notification {
  id: number
  type: 'comment' | 'reply'
  communityName: string
  message: string
  postId: number
  time: string
  author?: string
}

const props = withDefaults(
  defineProps<{
    notifications?: Notification[]
  }>(),
  {
    notifications: () => []
  }
)
const emit = defineEmits<{
  notificationClick: [postId: number]
  allNotificationsClick: []
}>()

const isExpanded = ref(false)
const isBannerStackVisible = ref(true) // 배너 스택 표시/숨김 상태
const currentStackIndex = ref(0)
let rollingInterval: NodeJS.Timeout | null = null

// 스택에서 보여줄 배너들 (현재 스택 기준으로 3개)
const visibleNotifications = computed(() => {
  const start = currentStackIndex.value
  return props.notifications.slice(start, start + 3)
})

// 확장 시 보여줄 알림들 (최대 5개)
const displayNotifications = computed(() => props.notifications.slice(0, 5))

// 자동 롤링 시작
const startRolling = () => {
  if (props.notifications.length > 3 && !isExpanded.value) {
    rollingInterval = setInterval(() => {
      currentStackIndex.value = (currentStackIndex.value + 1) % (props.notifications.length - 2)
    }, 3000) // 3초마다 롤링
  }
}

// 자동 롤링 중지
const stopRolling = () => {
  if (rollingInterval) {
    clearInterval(rollingInterval)
    rollingInterval = null
  }
}

// 배너 스타일 계산 (겹치는 효과)
const getBannerStyle = (index: number) => {
  const zIndex = 10 - index
  const translateY = index * 7 // 7px씩 아래로
  const scale = 1 - index * 0.02 // 조금씩 작아지게

  return {
    zIndex,
    transform: `translateY(${translateY}px) scale(${scale})`,
    opacity: 1 - index * 0.1 // 조금씩 투명해지게
  }
}

// 배너 클릭 핸들러
const handleBannerClick = (notification: Notification, index: number) => {
  if (index === 0) {
    // 맨 위 배너 클릭 시
    if (props.notifications.length === 1) {
      // 1개면 바로 게시글로 이동
      emit('notificationClick', notification.postId)
    } else {
      // 2개 이상이면 확장
      toggleExpanded()
    }
  } else {
    // 다른 배너 클릭 시 해당 게시글로 이동
    emit('notificationClick', notification.postId)
  }

  // 배너 클릭 시 banner-stack 숨기기
  isBannerStackVisible.value = false
}

// 확장 토글 함수
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

// close-btn 클릭 시 banner-stack 다시 보이기
const handleCloseClick = () => {
  isExpanded.value = false
  isBannerStackVisible.value = true
}

// 확장 상태 변경 시 롤링 제어
watch(isExpanded, newValue => {
  if (newValue) {
    stopRolling()
  } else {
    startRolling()
  }
})

// notifications 변경 시 롤링 재시작
watch(
  () => props.notifications,
  () => {
    stopRolling()
    currentStackIndex.value = 0
    startRolling()
  },
  { deep: true }
)

onMounted(() => {
  startRolling()
})

onUnmounted(() => {
  stopRolling()
})

// 알림 아이템 클릭
const handleNotificationClick = (postId: number) => {
  emit('notificationClick', postId)
}

// 전체보기 클릭
const handleAllNotificationsClick = () => {
  emit('allNotificationsClick')
}
</script>

<style scoped lang="scss">
.stacked-banner {
  position: relative;
  width: 100%;

  .banner-stack {
    position: relative;
    height: 8rem; // 스택 높이

    .banner-item {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: #fff;
      border: 1px solid #dde5f8;
      border-radius: 2rem;
      padding: 1.6rem 2rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px) scale(1.02) !important;
        box-shadow: 0 8px 25px rgba(76, 127, 247, 0.15);
      }

      &.top-banner {
        // 맨 위 배너 스타일
      }

      &.second-banner {
        // 두 번째 배너 스타일
        border-color: #e4e4e6;
        background: #f5f6f9;
      }

      &.third-banner {
        // 세 번째 배너 스타일
        border-color: #e8e8e8;
        background: #f2f3f7;
      }
      &.single-banner {
        background: #e7f4ff;
        border-color: #e7f4ff;
      }
    }

    .banner-content {
      display: flex;
      align-items: center;
      gap: 1.2rem;

      .banner-icon {
        flex-shrink: 0;
        width: 4rem;
        height: 4rem;
        background: #4c7ff7;
        border-radius: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon-bell {
          width: 2rem;
          height: 2rem;
          background-color: white;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'/%3E%3Cpath d='M13.73 21a2 2 0 0 1-3.46 0'/%3E%3C/svg%3E")
            no-repeat center;
          mask-size: contain;
        }
      }

      .banner-text {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        flex: 1;
        min-width: 0;
        gap: 0.2rem;

        .banner-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #4c7ff7;
          line-height: 2rem;
        }

        .banner-message {
          font-size: 1.6rem;
          font-weight: 500;
          color: #2b2b2b;
          line-height: 2.2rem;
        }
      }
    }

    .banner-counter {
      position: absolute;
      top: -0.8rem;
      right: -0.8rem;
      width: 2.4rem;
      height: 2.4rem;
      background: #ff4757;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
    }
  }

  .expanded-list {
    margin-top: -1.6rem;
    background: white;
    animation: slideDown 0.3s ease-out;

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .expanded-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 2rem 1rem;
      border-bottom: 1px solid #f0f5ff;

      h3 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #2b2b2b;
        margin: 0;
      }
    }

    .notification-list {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      .notification-item {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        padding: 1.6rem 2rem;
        border-radius: 2rem;
        background: #eef2fb;
        transition: background-color 0.2s ease;
        border-bottom: 1px solid #f6f9ff;
        &:last-child {
          border-bottom: none;
        }

        .notification-icon {
          flex-shrink: 0;
          width: 4rem;
          height: 4rem;
          background: #4c7ff7;
          border-radius: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;

          .icon-bell {
            width: 1.4rem;
            height: 1.4rem;
            background-color: white;
            mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'/%3E%3Cpath d='M13.73 21a2 2 0 0 1-3.46 0'/%3E%3C/svg%3E")
              no-repeat center;
            mask-size: contain;
          }
        }

        .notification-content {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;
          min-width: 0;
          .notification-title {
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 2rem;
            color: #4c7ff7;
          }

          .notification-message {
            font-weight: 500;
            line-height: 2.2rem;
          }

          // .notification-time {
          //   font-size: 1.2rem;
          //   color: #959595;
          //   line-height: 1.6rem;
          // }
        }
      }
    }

    .view-all-section {
      display: flex;
      justify-content: center;
      margin-top: 0.8rem;

      .view-all-btn {
        display: flex;
        align-items: center;
        width: auto;
        height: auto;
        padding: 1.2rem 2.4rem;
        color: white;
        border: none;
        border-radius: 3rem;
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 2.2rem;
        transition: background-color 0.2s ease;
        .count {
          font-weight: 700;
          color: #4c7ff7;
        }
      }

      .close-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 4.6rem;
        height: 4.6rem;
        padding: 1.1rem;
        background: #fff;
        border: 0.1rem solid #e2e2e2;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;

        &:hover {
          background: #e8f2ff;
        }

        .icon-chevron-up {
          width: 2.4rem;
          height: 2.4rem;
          background-color: #fff;
          background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 14.5834L12.0008 10L17 14.5834' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
          background-repeat: no-repeat;
          background-position: center;
          mask-size: contain;
        }
      }
    }
  }
}
</style>
