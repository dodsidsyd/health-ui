<template>
  <div class="card-info-wrap">
    <CardCommInfo
      badge="분류명"
      title="관리자에서 설정된 커뮤니티명이 들어갑니다."
      text="커뮤니티 한 줄 설명이 들어갑니다"
      :member-num="5678"
      :active-card="activeCard"
      type-format="competitive"
      @click="selectCard('A')"
    />

    <div class="card-item card-b" :class="{ active: activeCard === 'B' }" @click="selectCard('B')">
      <div class="card-content">
        <transition name="fade-slide" mode="out-in">
          <div v-if="activeCard === 'B'" key="expanded" class="expanded-content">
            <div class="flex flex-col gap-16">
              <strong class="tit">활력점수 랭킹<i class="icon ico-info3"></i></strong>
              <div class="rank-list">
                <transition-group name="rank-item" tag="div">
                  <NuxtLink
                    v-for="(rank, index) in displayRanks"
                    :key="rank.name"
                    to="#"
                    :style="{ transitionDelay: `${index * 50}ms` }"
                  >
                    <span class="rank">{{ rank.displayRank }}</span>
                    <div class="profile-img">
                      <img :src="`/_nuxt/assets/images/${rank.image}.${rank.extension}`" :alt="rank.name" />
                    </div>
                    <p class="name">{{ rank.name }}</p>
                    <strong class="score">{{ rank.score }}점</strong>
                  </NuxtLink>
                </transition-group>
              </div>
              <div class="my-rank">
                <div class="my-profile">
                  <img src="~/assets/images/community/img-rank-profile.png" alt="" />
                </div>
                내 순위는 현재 <strong class="point">{{ myRank }}</strong
                >에요
              </div>
            </div>
          </div>
          <div v-else key="collapsed" class="collapsed-content">
            <strong class="only-title">활력점수 랭킹<i class="icon ico-info3"></i></strong>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardCommInfo from '~/components/publishing/community/common/CardCommInfo.vue'

const activeCard = ref<'A' | 'B'>('A')
const isAnimating = ref(false)

function selectCard(id: 'A' | 'B') {
  if (activeCard.value === id || isAnimating.value) return

  isAnimating.value = true
  activeCard.value = id

  // 애니메이션 완료 후
  setTimeout(() => {
    isAnimating.value = false
  }, 400)
}

interface RankItem {
  name: string
  score: number
  image: string
  extension: string
}

const ranks: RankItem[] = [
  { name: '러블리냥이', score: 92, image: 'community/img-rank-profile', extension: 'png' },
  { name: '슈블리맘1212', score: 90.4, image: 'community/img-rank-profile', extension: 'png' },
  { name: '도치도치야야', score: 87.2, image: 'community/img-rank-profile', extension: 'png' },
  { name: '블라블라', score: 85, image: 'community/img-rank-profile', extension: 'png' },
  { name: '블라블라2', score: 80, image: 'community/img-rank-profile', extension: 'png' }
]

const displayRanks = (() => {
  const result: (RankItem & { displayRank: string })[] = []
  let prevScore: number | null = null
  let currentRank = 1
  let rankCount = 0

  for (let i = 0; i < ranks.length; i++) {
    const rank = ranks[i]

    if (i > 0 && rank.score === prevScore) {
      result.push({
        ...rank,
        displayRank: `공동 ${currentRank}위`
      })
    } else {
      currentRank = i + 1
      if (currentRank > 3) break

      result.push({
        ...rank,
        displayRank: `${currentRank}위`
      })
    }

    prevScore = rank.score
    rankCount++
    if (rankCount >= 3) break
  }

  return result
})()

const myRank = 2357
</script>

<style scoped lang="scss">
.card-info-wrap {
  display: flex;
  flex-direction: column;
  height: calc(100% - 4.8rem);
}

::v-deep(.card-item) {
  position: relative;
  overflow: hidden;
  border-radius: 2.4rem;
  padding: 3.2rem 2.4rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:not(.active) {
    padding: 1.6rem 2.4rem;
    display: flex;
    flex-direction: column;
    height: 10rem;
    z-index: 1;
  }
  &.active {
    z-index: 2;
  }
  &:after {
    display: block;
    content: '';
    position: absolute;
    bottom: 1.6rem;
    right: 2rem;
    width: 12rem;
    height: 12rem;
  }

  &.card-a {
    color: #fff;
    background: #d49152;

    &:not(.active) {
    }

    &.active {
      &:after {
        background: url('~/assets/images/community/ico-ring.svg') no-repeat center;
      }
    }

    .only-title {
      display: flex;
      align-items: center;
      position: relative;
      font-size: 1.4rem;
      line-height: 2.4rem;

      i {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        margin-left: 0.4rem;
      }

      &:after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 1.4rem;
        background: #fff
          url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.66699 6.66675L8.00087 9.72008L11.3337 6.66675' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")
          no-repeat center;
      }
    }
  }

  &.card-b {
    background: #f8f4f0;
    margin-top: -4.8rem;
    &:not(.active) {
      justify-content: flex-end;
    }

    &.active {
    }

    .tit {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 2rem;
      color: #2b2b2b;

      i {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        margin-left: 0.4rem;
      }
    }

    .rank-list {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    a {
      display: flex;
      align-items: center;
      padding: 0.8rem 0;
      gap: 1.2rem;
    }

    .rank {
      display: flex;
      padding: 0 0.6rem;
      font-size: 1.6rem;
      font-weight: 700;
    }

    .profile-img {
      width: 3.2rem;
      height: 3.2rem;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .name {
      flex: 3;
      font-size: 1.4rem;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .score {
      display: block;
      flex: 1;
      text-align: right;
      font-size: 1.6rem;
    }

    .my-rank {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.6rem;
      background: rgba(0, 0, 0, 0.06);
      padding: 1.2rem 2.4rem;
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.4rem;
      color: #2b2b2b;

      .point {
        display: inline-block;
        margin-left: 0.4rem;
        color: #4c7ff7;
      }

      .my-profile {
        width: 2.4rem;
        height: 2.4rem;
        overflow: hidden;
        margin-right: 1rem;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .only-title {
      display: flex;
      align-items: center;
      position: relative;
      font-size: 1.4rem;
      line-height: 2.4rem;

      i {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        margin-left: 0.4rem;
      }

      &:after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 1.4rem;
        border: 1px solid #e2e2e2;
        background: #fff
          url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.333 9.33325L7.99913 6.27992L4.66634 9.33325' stroke='%232B2B2B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")
          no-repeat center;
      }
    }
  }
}
</style>
