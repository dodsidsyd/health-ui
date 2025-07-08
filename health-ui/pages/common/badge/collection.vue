<template>
  <BaseBody page-title="MY배지 모아보기" :show-back-button="true">
    <MyBadgeProfile :badge-count="badges1.length" :profile-image="''"></MyBadgeProfile>
    <MyBadgeWrap title="걸음수" :badges-data="badges1" :show-title-box="false"> </MyBadgeWrap>
  </BaseBody>
</template>

<script setup lang="ts">
import MyBadgeWrap from '~/components/publishing/common/myBadge/myBadgeWrap.vue'
import MyBadgeProfile from '~/components/publishing/common/myBadge/myBadgeProfile.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import walkedBadgeImg from '~/assets/images/badge/icon-badge-walked.png'
import StreakBadgeImg from '~/assets/images/badge/icon-badge-streak.png'
import HealthBadgeImg from '~/assets/images/badge/icon-badge-health.png'
import communityBadgeImg from '~/assets/images/badge/icon-badge-community.png'

interface Badge {
  id: number
  type: 'walked' | 'streak' | 'health' | 'community'
  title: string
  date?: string
  imageName?: string
  variant?: 'empty'
  profileImage?: string
}

const badges1 = ref<Badge[]>([
  {
    id: 1,
    type: 'walked',
    title: '7천 걸음 걷기',
    date: '2024. 01. 23',
    imageName: walkedBadgeImg
  },
  {
    id: 2,
    type: 'walked',
    title: '1만 걸음 걷기',
    date: '2024. 06. 29',
    imageName: walkedBadgeImg
  },
  {
    id: 3,
    type: 'walked',
    title: '2만 걸음 걷기',
    date: '2024. 06. 28',
    imageName: walkedBadgeImg
  },
  {
    id: 4,
    type: 'streak',
    title: '7천 걸음 걷기',
    date: '2024. 01. 23',
    imageName: StreakBadgeImg
  },
  {
    id: 5,
    type: 'streak',
    title: '2주 연속 달성',
    date: '2024. 01. 23',
    imageName: StreakBadgeImg
  },
  {
    id: 6,
    type: 'streak',
    title: '3주 연속 달성',
    date: '2024. 01. 23',
    imageName: StreakBadgeImg
  },
  {
    id: 7,
    type: 'health',
    title: '1주 연속 달성',
    date: '2024. 01. 23',
    imageName: HealthBadgeImg
  },
  {
    id: 8,
    type: 'health',
    title: '2주 연속 달성',
    date: '2024. 01. 23',
    imageName: HealthBadgeImg
  },
  {
    id: 9,
    type: 'health',
    title: '3주 연속 달성',
    date: '2024. 01. 23',
    imageName: HealthBadgeImg
  },
  {
    id: 10,
    type: 'community',
    title: '생초보',
    date: '2024. 01. 23',
    imageName: communityBadgeImg
  },
  {
    id: 11,
    type: 'community',
    title: '커뮤니티죽돌이',
    date: '2024. 01. 23',
    imageName: communityBadgeImg
  },
  {
    id: 12,
    type: 'community',
    title: '늘 먹던 맛',
    date: '2024. 01. 23',
    imageName: communityBadgeImg
  }
])
</script>

<style scoped lang="scss"></style>
