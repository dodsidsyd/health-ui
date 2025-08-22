<template>
  <section class="my-community-section">
    <!-- 내 커뮤니티가 없을 경우 -->
    <template v-if="!items || items.length === 0">
      <div class="community-banner" @click="handleExploreClick">
        <strong class="community-banner-title">커뮤니티 둘러보기</strong>
        <p class="community-banner-text">더 건강한 나, 함께 만들어요</p>
      </div>
    </template>
    <template v-else>
      <BannerStacked
        v-if="notifications.length > 0"
        :notifications="notifications"
        @notification-click="handleNotificationClick"
        @all-notifications-click="handleAllNotificationsClick"
      />
      <!-- 내 커뮤니티 섹션 -->
      <TitleBox
        title="내 커뮤니티"
        titleClass=""
        ariaLabel="내 커뮤니티"
        text=""
        :is-showLink="true"
        element-type="a"
        link-href="/community/explore/MyCommunityTab"
        icon="arrow-type-black"
        class="mt-32"
      />

      <!-- 커뮤니티 목록 -->
      <MyCommunity :items="items" @card-click="handleCardClick" />
    </template>
  </section>
</template>

<script setup lang="ts">
import TitleBox from '~/components/common/TitleBox.vue'
import BannerStacked from '~/components/publishing/community/home/BannerStacked.vue'
import MyCommunity from '~/components/publishing/community/home/MyCommunity.vue'

// Props 정의
interface CommunityItem {
  id?: string | number
  text?: string
  src?: string
  isNew?: boolean
}

interface Props {
  items?: CommunityItem[]
}

const props = defineProps<Props>()

// 알림 데이터 (items가 없을 때 표시)
const notifications = ref([
  {
    id: 1,
    type: 'comment' as const,
    communityName: '건강정보',
    communityType: 'health',
    message: '내 게시글에 댓글이 달렸어요.',
    postId: 123,
    time: '5분 전'
  },
  {
    id: 2,
    type: 'reply' as const,
    communityName: '운동정보',
    message: '내 댓글에 답글을 남겼어요.',
    postId: 456,
    time: '10분 전'
  },
  {
    id: 3,
    type: 'comment' as const,
    communityName: '보험상담',
    message: '내 게시글에 댓글이 달렸어요.',
    postId: 789,
    time: '15분 전'
  },
  {
    id: 4,
    type: 'comment' as const,
    communityName: '건강정보',
    communityType: 'health',
    message: '내 게시글에 댓글이 달렸어요.',
    postId: 123,
    time: '5분 전'
  },
  {
    id: 5,
    type: 'reply' as const,
    communityName: '운동정보',
    message: '내 댓글에 답글을 남겼어요.',
    postId: 456,
    time: '10분 전'
  },
  {
    id: 6,
    type: 'comment' as const,
    communityName: '보험상담',
    message: '내 게시글에 댓글이 달렸어요.',
    postId: 789,
    time: '15분 전'
  }
])

// Emits 정의
const emit = defineEmits<{
  cardClick: [item: CommunityItem]
  notificationClick: [postId: number]
  allNotificationsClick: []
}>()

// 카드 클릭 핸들러
const handleCardClick = (item: CommunityItem) => {
  emit('cardClick', item)
}

// 알림 클릭 핸들러
const handleNotificationClick = (postId: number) => {
  // 게시글 상세화면으로 이동
  navigateTo(`/community/post/${postId}`)
  console.log(`게시글 ${postId}로 이동`)
  emit('notificationClick', postId)
}

// 알림전체보기 클릭 핸들러
const handleAllNotificationsClick = () => {
  // 통합 알림함으로 이동
  navigateTo('/notifications')
  console.log('통합 알림함으로 이동')
  emit('allNotificationsClick')
}

// 커뮤니티 둘러보기 배너 클릭 핸들러
const handleExploreClick = () => {
  navigateTo('/community/explore')
  console.log('커뮤니티 둘러보기 클릭')
}
</script>

<style scoped lang="scss">
.my-community-section {
  padding: 3.2rem 0;
  .community-banner {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    position: relative;
    overflow: hidden;
    padding: 1.6rem 2rem;
    background: #e7f4ff;
    border-radius: 1.2rem;
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      right: 2.4rem;
      transform: translateY(-50%);
      width: 5rem;
      height: 5rem;
      background: url('~/assets/images/community/home/ico-banner.svg') no-repeat center center / contain;
    }
    .community-banner-title {
      line-height: 2.2rem;
    }
    .community-banner-text {
      font-size: 1.4rem;
      line-height: 2rem;
    }
  }
}
</style>
