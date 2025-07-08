<template>
  <div class="list-skeleton">
    <!-- 리스트 아이템들 -->
    <div class="list-items">
      <div v-for="i in skeletonCount" :key="`skeletion-${i}`" class="list-item">
        <!-- 등수 및 등수 등락도 -->
        <div class="item-rank">
          <SkeletonBlock width="100%" height="32px" effect="wave" />
          <SkeletonBlock width="100%" height="16px" effect="wave" />
        </div>

        <!-- 아바타/이미지 -->
        <div class="item-avatar">
          <SkeletonAvatar :size="48" effect="wave" :show-icon="true" />
        </div>

        <!-- 텍스트 콘텐츠 -->
        <div class="item-user-info">
          <!-- 이름 -->
          <SkeletonBlock width="40%" height="20px" effect="wave" />
          <!-- 사는 지역 -->
          <SkeletonBlock width="40%" height="16px" effect="wave" />
        </div>

        <!-- 걸음 수-->
        <div class="item-walk-count">
          <SkeletonBlock width="100%" height="20px" effect="wave" />
          <SkeletonBlock width="100%" height="16px" effect="wave" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SkeletonAvatar, SkeletonBlock } from 'skeleton-elements/vue'
interface RankingUser {
  id: number
  rank: number
  name: string
  location: string
  walkCount: number
  avatar: string
  rankChange?: number
}
defineProps<{
  rankingData: RankingUser[]
  skeletonCount: number
}>()
</script>

<style scoped lang="scss">
.list-items {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.list-item {
  display: flex;
  align-items: center;
}

.item-rank {
  width: 10%;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  // box-shadow: inset 0 0 0 1px red;
}
.item-rank div:first-child {
  margin-bottom: 3px;
}

.item-avatar {
  width: 20%;
  margin-right: 16px;
  // box-shadow: inset 0 0 0 1px red;
}

.item-user-info {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  // box-shadow: inset 0 0 0 1px red;
}

.item-walk-count {
  width: 30%;
  display: flex;
  // box-shadow: inset 0 0 0 1px red;
  flex-direction: column;
  gap: 6px;
}
</style>
