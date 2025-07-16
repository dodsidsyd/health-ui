<template>
  <div class="another-board-wrap">
    <p class="wrap-title">
      <span>{{ author }}</span> 님의 다른 게시글
    </p>
    <CommonSwiper
      :slides="communitySlides"
      slide-type="custom"
      :slides-per-view="1.75"
      :space-between="12"
      :navigation="false"
      :pagination="false"
      :scrollbar="false"
      :autoplay="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
    >
      <!-- 커뮤니티 슬라이드 커스텀 템플릿 -->
      <template #default="{ slide, index }">
        <div class="community-box">
          <div class="content-area">
            <div v-if="slide.image" class="img-wrap">
              <img :src="slide.image" :alt="slide.title" />
              <div v-if="slide.imageCount > 1" class="img-length">+{{ slide.imageCount }}</div>
            </div>
            <div class="tit">{{ slide.title }}</div>
            <div class="detail-info">
              <span class="like-num">{{ slide.likes }}</span>
              <span>조회 {{ slide.views }}</span>
              <span>댓글 {{ slide.replies }}</span>
            </div>
          </div>
        </div>
      </template>
    </CommonSwiper>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'

import communityImg01 from '~/assets/images/img-community-01.png'

const props = defineProps({
  src: { type: String, default: 'img-profile.svg' },
  nickname: { type: String, default: '' },
  level: { type: Number, default: 0 },
  time: { type: Number, default: 1 },
  author: { type: String, required: true },
  comment: {
    type: String,
    default: '댓글내용이 들어갑니다. 댓글내용이 들어갑니다. 댓글내용이 들어갑니다. 댓글내용이 들어갑니다.'
  }
})

// 커뮤니티 슬라이드 데이터
const communitySlides = ref([
  {
    title: '제목이 들어갑니다. 제목이 들어갑니다. 제목이 들어갑니다. 제목이 들어갑니다. ',
    content: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likes: 131,
    views: 70,
    replies: 2,
    image: communityImg01,
    imageCount: 3
  },
  {
    category: '헬스케어',
    title: '건강관리 팁 공유합니다',
    content: '매일 꾸준히 하는 것이 중요해요. 작은 변화부터 시작하세요!',
    likes: 89,
    views: 45,
    replies: 5,
    image: communityImg01,
    imageCount: 2
  },
  {
    category: '운동',
    title: '홈트레이닝 루틴 추천',
    content: '집에서도 충분히 효과적인 운동이 가능합니다. 지금 바로 시작해보세요!',
    likes: 205,
    views: 152,
    replies: 12,
    image: communityImg01,
    imageCount: 4
  },
  {
    category: '식단',
    title: '다이어트 도시락 레시피',
    content: '건강하고 맛있는 도시락으로 다이어트 성공하기! 레시피 공유해요',
    likes: 67,
    views: 89,
    replies: 8,
    image: communityImg01,
    imageCount: 1
  }
])
</script>

<style scoped lang="scss">
.another-board-wrap {
  margin: 0 -2rem;
  padding-left: 2rem;
  .wrap-title {
    margin-bottom: 1.6rem;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
    span {
      color: var(--blue-primary);
    }
  }

  :deep(.swiper-slide) {
    border-radius: 0 !important;
  }
  // 커뮤니티 박스 스타일
  .community-box {
    width: 100%;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    border-bottom: 0.1rem solid #eee;
    background: transparent;
    display: flex;
    align-items: flex-start;
    text-align: left;
    &:last-child {
      border-bottom: none;
    }
    .content-area {
      gap: 1.2rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .tit {
      font-weight: 500;
      line-height: 2.2rem;
      @include mixin.multi-ellipsis($clamp: 2);
    }
    .detail-info {
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 2.4rem;
      color: #959595;
      gap: 1.2rem;

      display: flex;
      .like-num {
        display: inline-flex;
        align-items: center;
        &:before {
          content: '';
          display: inline-block;
          width: 2.4rem;
          height: 2.4rem;
          margin-right: 0.4rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z' fill='%23D5D5D5'/%3E%3Cpath d='M9.21477 9.11719H9.11914V9.19406H9.21477V9.11719Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14.9641 9.11719H14.8791V9.19406H14.9641V9.11719Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.67188 14.9165C9.37181 16.0473 10.6008 16.7973 11.9999 16.7973C13.3991 16.7973 14.628 16.0473 15.328 14.9165' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
        }
      }
    }
    .img-wrap {
      width: 100%;
      height: 14.1rem;
      border-radius: 1.2rem;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
