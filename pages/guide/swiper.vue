<template>
  <div class="header-type-guide">
    <div class="swiper-guide-section">
      <h1>Swiper 컴포넌트 가이드</h1>

      <!-- 기본 이미지 슬라이드 예제 -->
      <section>
        <h2>기본 이미지 슬라이드 (모든 컨트롤 표시)</h2>
        <div class="mt-20">
          <CommonSwiper
            :slides="imageSlides"
            slide-type="image"
            :slides-per-view="1"
            :space-between="20"
            :navigation="true"
            :pagination="{ clickable: true }"
            :autoplay="true"
            :scrollbar="false"
            :show-slide-info="true"
            :show-play-pause-button="true"
          />
        </div>
      </section>

      <!-- 슬라이드 정보 비표시 예제 -->
      <section>
        <h2>슬라이드 정보 비표시</h2>
        <div class="mt-20">
          <CommonSwiper
            :slides="imageSlides"
            slide-type="image"
            :slides-per-view="1"
            :space-between="20"
            :navigation="true"
            :pagination="{ clickable: true }"
            :autoplay="true"
            :scrollbar="false"
            :show-slide-info="false"
            :show-play-pause-button="true"
          />
        </div>
      </section>

      <!-- Play/Pause 버튼 비표시 예제 -->
      <section>
        <h2>Play/Pause 버튼 비표시</h2>
        <div class="mt-20">
          <CommonSwiper
            :slides="imageSlides"
            slide-type="image"
            :slides-per-view="1"
            :space-between="20"
            :navigation="true"
            :pagination="{ clickable: true }"
            :autoplay="true"
            :scrollbar="false"
            :show-slide-info="true"
            :show-play-pause-button="false"
          />
        </div>
      </section>

      <!-- 모든 컨트롤 비표시 예제 -->
      <section>
        <h2>모든 컨트롤 비표시 (깔끔한 슬라이더)</h2>
        <div class="mt-20">
          <CommonSwiper
            :slides="imageSlides"
            slide-type="image"
            :slides-per-view="1"
            :space-between="20"
            :navigation="true"
            :pagination="{ clickable: true }"
            :autoplay="true"
            :scrollbar="false"
            :show-slide-info="false"
            :show-play-pause-button="false"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import imgBanner from '@/assets/images/img-banner.png'

// 이미지 슬라이드 데이터 (로컬 이미지 사용)
const imageSlides = [imgBanner, imgBanner, imgBanner, imgBanner]
</script>

<style scoped lang="scss">
.swiper-guide-section {
  h1 {
    color: #333;
    margin-bottom: 3rem;
    text-align: center;
    font-size: 2rem;
  }

  section {
    margin-bottom: 5rem;
    padding: 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #fafafa;

    h2 {
      color: #007bff;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      border-bottom: 0.2rem solid #007bff;
      padding-bottom: 1rem;
    }
  }
}
</style>
