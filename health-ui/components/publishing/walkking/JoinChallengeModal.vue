<template>
  <div class="join-challenge-wrap">
    <div class="gift-slide-wrap">
      <CommonSwiper
        :slides="imageSlides"
        slide-type="image"
        :slides-per-view="3.6325"
        :space-between="16"
        :navigation="false"
        :pagination="false"
        :autoplay="true"
        :scrollbar="false"
        :show-slide-info="false"
        :show-slide-length="false"
        :show-play-pause-button="false"
        :loop="true"
        :autoplay-delay="900"
      />
    </div>
    <div class="info-box">
      <h3 class="title">
        <span><span>유료</span>{{ point }}</span
        >로 참가하실 경우<br />더 좋은 혜택을 받아보실 수 있어요!
      </h3>
      <p class="detail">
        랜덤 미션을 통해 발급되는 행운복권은<br />
        모든 참가자가 지급 대상입니다.
      </p>
      <p class="warning">*유료참가 후 취소 시 포인트 환불은 불가합니다.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import imgGift1 from '~/assets/images/walkingking/img-join-challenge1.png'
import imgGift2 from '~/assets/images/walkingking/img-join-challenge2.png'
import imgGift3 from '~/assets/images/walkingking/img-join-challenge3.png'
import imgGift4 from '~/assets/images/walkingking/img-join-challenge4.png'

// 이미지 슬라이드 데이터 (로컬 이미지 사용)
const imageSlides = [imgGift1, imgGift2, imgGift3, imgGift4, imgGift1, imgGift2, imgGift3, imgGift4]

const props = defineProps({
  point: { type: String, default: '5,000P' }
})
</script>

<style scoped lang="scss">
.join-challenge-wrap {
  text-align: center;
}
.gift-slide-wrap {
  height: 11.2rem;
  margin: 4rem -2rem 3.2rem -7.6rem;
}
.info-box {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .title {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
    span {
      margin-right: 0.4rem;
      color: var(--blue-primary);
    }
  }
  .detail {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #555;
  }
  .warning {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.6rem;
    color: #f14960;
  }
}
</style>
