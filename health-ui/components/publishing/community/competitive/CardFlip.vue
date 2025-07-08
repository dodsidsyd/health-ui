<template>
  <div class="card-info-wrap" :style="{ height: wrapHeight + 'px' }">
    <div class="card-itme card-a" ref="cardARef" :class="{ active: activeCard === 'A' }" @click="selectCard('A')">
      <div class="">
        <template v-if="activeCard === 'A'">
          <div class="flex flex-col gap-8">
            <span class="badge">분류명</span>
            <strong class="tit">관리자에서 설정된<br />커뮤니티명이 들어갑니다.</strong>
            <p class="text">커뮤니티 한 줄 설명이 들어갑니다.</p>
          </div>
          <div>
            <p class="member">
              멤버 <span>{{ memberNumFormat }}명</span>
            </p>
          </div>
        </template>
        <template v-else>
          <strong class="only-title">스마트링 커뮤니티 소개<i class="icon ico-info2"></i></strong>
        </template>
      </div>
    </div>
    <div class="card-itme card-b" ref="cardBRef" :class="{ active: activeCard === 'B' }" @click="selectCard('B')">
      <div class="">
        <template v-if="activeCard === 'B'">
          <div class="flex flex-col gap-16">
            <strong class="tit">활력점수 랭킹<i class="icon ico-info3"></i></strong>
            <div class="rank-list">
              <NuxtLink v-for="(rank, index) in displayRanks" :key="rank.name" to="#">
                <span class="rank">{{ rank.displayRank }}</span>
                <div class="profile-img">
                  <img :src="`/_nuxt/assets/images/${rank.image}.${rank.extension}`" :alt="rank.name" />
                </div>
                <p class="name">{{ rank.name }}</p>
                <strong class="score">{{ rank.score }}점</strong>
              </NuxtLink>
            </div>
            <div class="my-rank">
              <div class="my-profile">
                <img src="~/assets/images/community/img-rank-profile.png" alt="" />
              </div>
              내 순위는 현재 <strong class="point">{{ myRank }}</strong
              >에요
            </div>
          </div>
        </template>
        <template v-else>
          <strong class="only-title">활력점수 랭킹<i class="icon ico-info3"></i></strong>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

const activeCard = ref<'A' | 'B'>('A')

const cardARef = ref<HTMLElement | null>(null)
const cardBRef = ref<HTMLElement | null>(null)
const wrapHeight = ref(0)

function updateWrapHeight() {
  setTimeout(() => {
    nextTick(() => {
      const aActive = activeCard.value === 'A'
      const bActive = activeCard.value === 'B'

      const aHeight = aActive ? cardARef.value?.offsetHeight || 0 : 48
      const bHeight = bActive ? cardBRef.value?.offsetHeight || 0 : 52

      wrapHeight.value = aHeight + bHeight

      console.log(aHeight, bHeight)
    })
  }, 10)
}

function selectCard(id: 'A' | 'B') {
  if (activeCard.value === id) return
  activeCard.value = id
  updateWrapHeight()
}

onMounted(() => {
  updateWrapHeight()
})

watch(activeCard, () => {
  updateWrapHeight()
})

const memberNum = 1230
const memberNumFormat = memberNum.toLocaleString()

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
  let currentRank = 1 // 실제 순위
  let rankCount = 0 // 몇 명 출력했는지

  for (let i = 0; i < ranks.length; i++) {
    const rank = ranks[i]

    if (i > 0 && rank.score === prevScore) {
      // 이전과 동일 점수 → 공동 순위
      result.push({
        ...rank,
        displayRank: `공동 ${currentRank}위`
      })
    } else {
      // 새로운 순위
      currentRank = i + 1
      if (currentRank > 3) break

      result.push({
        ...rank,
        displayRank: `${currentRank}위`
      })
    }

    prevScore = rank.score
    rankCount++
    if (rankCount >= 3) break // 최대 3명까지만
  }

  return result
})()

const myRank = 2357
</script>

<style scoped lang="scss">
.card-info-wrap {
  position: relative;
  overflow: hidden;
  // transition: height 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  transition: height 0.5s ease;
}
.card-itme {
  overflow: hidden;
  position: absolute;
  left: 0;
  width: 100%;
  min-height: 20rem;
  // transition:
  //   transform 0.4s ease,
  //   padding 0.3s ease;
  transition:
    transform 0.5s ease,
    z-index 0.3s;
  padding: 1.2rem 2.4rem;
  border-radius: 2.4rem;
  z-index: 1;
  &.active {
    padding: 3.2rem 2.4rem;
    z-index: 2;
  }
  &.card-a {
    &:not(.active) {
      background: #d49152;
    }
    top: 0;
    background: #d49152 url('~/assets/images/community/ico-ring.svg') no-repeat right 1.6rem bottom 2rem;
    color: #fff;
    .badge {
      width: max-content;
      overflow: hidden;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
      font-size: 1.2rem;
      font-weight: 500;
      line-height: 1.6rem;
    }
    .tit {
      font-size: 2.4rem;
      line-height: 3.1rem;
    }
    .text {
      font-weight: 500;
      line-height: 2.2rem;
      opacity: 0.8;
    }
    .member {
      margin-top: 8.8rem;
      padding-left: 2.6rem;
      background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.2853 11.003C21.2859 8.96866 20.6832 6.97985 19.5535 5.28805C18.4237 3.59626 16.8177 2.27746 14.9384 1.49843C13.0592 0.719396 10.9911 0.515117 8.99579 0.91143C7.00045 1.30774 5.16743 2.28684 3.72855 3.72492C2.28966 5.163 1.30952 6.99546 0.912076 8.99058C0.514636 10.9857 0.717743 13.0539 1.49571 14.9336C2.27368 16.8133 3.59157 18.42 5.28273 19.5507C6.97389 20.6814 8.96236 21.2852 10.9967 21.2858C12.3475 21.2865 13.6853 21.0211 14.9335 20.5047C16.1818 19.9883 17.316 19.231 18.2715 18.2761C19.227 17.3212 19.9849 16.1873 20.502 14.9394C21.0191 13.6914 21.2853 12.3538 21.2853 11.003Z' fill='white'/%3E%3Cpath d='M11.0826 11C12.5226 11 13.6541 9.86861 13.6541 8.42861C13.6541 6.98861 12.5226 5.85718 11.0826 5.85718C9.64264 5.85718 8.51121 6.98861 8.51121 8.42861C8.51121 9.86861 9.64264 11 11.0826 11ZM15.8655 15.5257C15.1969 12.9029 12.5226 11.2572 9.89978 11.9257C8.15121 12.3886 6.76264 13.7257 6.29978 15.5257C6.24836 15.7829 6.40264 16.0915 6.71121 16.1429C6.76264 16.1429 6.81407 16.1429 6.81407 16.1429H15.3512C15.6598 16.1429 15.8655 15.9372 15.8655 15.6286C15.8655 15.5772 15.8655 15.5257 15.8655 15.5257Z' fill='%236C6C6C'/%3E%3C/svg%3E%0A");
      background-size: 2rem;
      background-repeat: no-repeat;
      background-position: left center;
      font-size: 1.4rem;
      line-height: 2.4rem;
      span {
        font-weight: 700;
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
        overflow: hidden;
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
    &.active {
      bottom: 0;
    }
    &:not(.active) {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      bottom: 0;
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
      border-radius: 99rem;
    }
    .name {
      flex: 3;
      font-size: 1.4rem;
      font-weight: 500;
      @include mixin.ellipsis;
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
      border-radius: 6px;
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
        border-radius: 99rem;
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
        overflow: hidden;
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
