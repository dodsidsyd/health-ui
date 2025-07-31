<template>
  <div class="monthly-ranking">
    <div class="monthly-raning-tit">
      <h4 class="tit">이번 달 랭킹</h4>
      <span class="date-txt">2025.05 기준</span>
    </div>

    <CommonSwiper
      :slides="claimBestSlides"
      :slides-per-view="'auto'"
      :space-between="8"
      :navigation="false"
      :pagination="false"
      :scrollbar="false"
      :loop="false"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="rainking-item-list"
    >
      <template #default="{ slide }">
        <div class="item">
          <strong class="tit-item">{{ slide.title }}</strong>
          <span v-if="slide.ranking" class="ranking">{{ slide.ranking }}</span>
          <p v-if="slide.steps" class="steps-average">
            평균<strong>{{ slide.steps.toLocaleString() }}</strong
            >걸음
          </p>
          <div v-if="slide.profile" class="profile-info">
            <img :src="slide.profile.image" :alt="slide.profile.name" />
            <div class="profile-txt">
              {{ slide.profile.name }}
              <strong>{{ slide.profile.count }}개</strong>
            </div>
          </div>
        </div>
      </template>
    </CommonSwiper>
  </div>
</template>

<script setup lang="ts">
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'

import dummyImage from '~/assets/images/community/img-rank-profile.png'

const claimBestSlides = ref([
  {
    title: '걸음수',
    ranking: '1,432등',
    steps: 5342
  },
  {
    title: '숙제 1등',
    profile: {
      image: dummyImage,
      name: '유재훈천재',
      count: 27
    }
  },
  {
    title: '응원 1등',
    profile: {
      image: dummyImage,
      name: '유재훈천재',
      count: 27
    }
  },
  {
    title: '댓글 1등',
    profile: {
      image: dummyImage,
      name: '유재훈천재',
      count: 42
    }
  }
])
</script>

<style scoped lang="scss">
.monthly-ranking {
  margin-top: 3.2rem;

  .monthly-raning-tit {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 1.2rem;

    .tit {
      font-size: 2rem;
      font-weight: 700;
      color: #2b2b2b;
    }

    .date-txt {
      font-size: 1.4rem;
      font-weight: 400;
      color: #959595;
    }
  }

  .rainking-item-list {
    :deep(swiper-slide) {
      width: 16.8rem !important;
      flex-shrink: 0;
    }
    .item {
      display: flex;
      flex: 0 0 auto;
      flex-direction: column;
      width: 100%;
      height: 100%;
      border-radius: 2rem;
      background-color: #f4f4f4;
      padding: 2rem 1.6rem;

      .tit-item {
        font-size: 1.6rem;
        font-weight: 600;
        color: #2b2b2b;
      }

      .ranking {
        color: #2b2b2b;
        font-size: 1.4rem;
        display: inline-block;
        margin-top: 0.4rem;
      }

      .steps-average {
        margin-top: 1.6rem;
        font-weight: 400;
        font-size: 1.4rem;
        color: #555;

        strong {
          // 변수가 import되지 않은 경우 직접 색상 값 사용
          color: #4c7ff7; // vars.$blue-primary 대체
          font-weight: 700;
          display: inline-block;
          padding: 0 0.2rem;
        }
      }

      .profile-info {
        display: flex;
        margin-top: 1.6rem;
        gap: 0 1.2rem;
        font-size: 1.6rem;
        font-weight: 500;
        color: #555;
        align-items: center;

        img {
          width: 4rem;
          height: 4rem;
          object-fit: cover;
          border-radius: 50%;
        }

        .profile-txt {
          display: flex;
          flex-direction: column;

          strong {
            font-weight: 700;
            color: #4c7ff7; // vars.$blue-primary 대체
            margin-top: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
