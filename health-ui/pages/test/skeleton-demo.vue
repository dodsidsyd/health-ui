<template>
  <div class="skeleton-demo" style="width: 100%; display: flex; flex-direction: column; gap: 1rem; padding: 1rem">
    <h2>랭킹 유저 리스트 스켈레톤 데모(2초 지연)</h2>

    <div class="controls">
      <button class="demo-button" :disabled="isLoading" @click="loadRankingData">
        {{ isLoading ? '데이터 로딩 중...' : '랭킹 데이터 불러오기' }}
      </button>

      <button v-if="!isLoading && rankingData.length > 0" class="demo-button secondary" @click="resetData">
        초기화
      </button>
    </div>

    <div class="demo-container">
      <!-- 로딩 중일 때 스켈레톤 표시 -->
      <RankingUserListSkeleton v-if="isLoading" :ranking-data="rankingData" :skeleton-count="skeletonCount" />

      <!-- 로딩 완료 후 실제 데이터 표시 -->
      <div v-else-if="rankingData.length > 0" class="ranking-list">
        <div class="ranking-items">
          <div v-for="user in rankingData" :key="user.id" class="ranking-item">
            <!-- 등수 및 등수 변화 -->
            <div class="item-rank">
              <div class="rank-number">{{ user.rank }}</div>
              <div v-if="user.rankChange" class="rank-change">
                <span :class="['rank-change-text', user.rankChange > 0 ? 'rank-up' : 'rank-down']">
                  {{ user.rankChange > 0 ? '▲' : '▼' }} {{ Math.abs(user.rankChange) }}
                </span>
              </div>
            </div>

            <!-- 아바타 -->
            <div class="item-avatar">
              <img :src="user.avatar" :alt="`${user.name} 프로필`" class="avatar-image" />
            </div>

            <!-- 사용자 정보 -->
            <div class="item-user-info">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-location">{{ user.location }}</div>
            </div>

            <!-- 걸음 수 -->
            <div class="item-walk-count">
              <div class="walk-count-number">{{ (user?.walkCount || 0).toLocaleString() }}</div>
              <div class="walk-count-label">걸음</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RankingUserListSkeleton from '~/components/common/skeleton/RankingUserListSkeleton.vue'

interface RankingUser {
  id: number
  rank: number
  name: string
  location: string
  walkCount: number
  avatar: string
  rankChange?: number
}

// 상태 관리
const isLoading = ref(false)
const rankingData = ref<RankingUser[]>([])
const skeletonCount = computed(() => rankingData.value.length || 8)

// 서버 API 호출 함수
const fetchRankingData = async (): Promise<RankingUser[]> => {
  try {
    return await $fetch<RankingUser[]>('/api/skeletonTest')
  } catch (error) {
    console.error('❌ API 호출 실패:', error)
    throw error
  }
}

// 랭킹 데이터 로드 함수
const loadRankingData = async () => {
  try {
    isLoading.value = true
    const data = await fetchRankingData()
    rankingData.value = data
  } catch (error) {
    console.error('❌ 서버 API 호출 실패:', error)
  } finally {
    isLoading.value = false
  }
}

// 데이터 초기화
const resetData = () => {
  rankingData.value = []
}
</script>

<style scoped lang="scss">
.controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.demo-container {
  padding: 24px;
  min-height: 400px;
}

.ranking-items {
  display: flex;
  flex-direction: column;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e9ecef;
}

.item-rank {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  .rank-number {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  .rank-change {
    margin-top: 4px;
    .rank-change-text {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 12px;

      &.rank-up {
        color: red;
      }

      &.rank-down {
        color: blue;
      }
    }
  }
}

.item-avatar {
  margin-right: 16px;

  .avatar-image {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #e9ecef;
    transition: border-color 0.2s ease;
  }
}

.item-user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .user-name {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .user-location {
    font-size: 14px;
    color: #6c757d;
  }
}

.item-walk-count {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;

  .walk-count-number {
    font-size: 18px;
    font-weight: bold;
  }

  .walk-count-label {
    font-size: 12px;
    color: #6c757d;
    font-weight: 500;
  }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #6c757d;

  .empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
    opacity: 0.7;
  }

  .empty-message {
    font-size: 18px;
    font-weight: 500;
  }
}

.loading-info {
  margin-top: 16px;
  text-align: center;

  p {
    color: #007bff;
    font-weight: 600;
    font-size: 16px;
    padding: 12px;
    background: rgba(0, 123, 255, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(0, 123, 255, 0.2);
  }
}

// 애니메이션 효과
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ranking-item {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.ranking-item:nth-child(1) {
  animation-delay: 0.1s;
}
.ranking-item:nth-child(2) {
  animation-delay: 0.2s;
}
.ranking-item:nth-child(3) {
  animation-delay: 0.3s;
}
.ranking-item:nth-child(4) {
  animation-delay: 0.4s;
}
.ranking-item:nth-child(5) {
  animation-delay: 0.5s;
}
.ranking-item:nth-child(6) {
  animation-delay: 0.6s;
}
.ranking-item:nth-child(7) {
  animation-delay: 0.7s;
}
.ranking-item:nth-child(8) {
  animation-delay: 0.8s;
}
</style>
