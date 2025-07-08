<template>
  <div class="simple-swiper-test">
    <h3>Swiper 동작 테스트</h3>
    
    <!-- 기본 Nuxt-Swiper 컴포넌트 직접 사용 -->
    <div class="test-container">
      <Swiper
        :slides-per-view="1"
        :space-between="10"
        :pagination="{ clickable: true }"
        :navigation="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="(slide, index) in testSlides" :key="index">
          <div class="test-slide">
            <h4>슬라이드 {{ index + 1 }}</h4>
            <p>{{ slide.title }}</p>
            <p>{{ slide.content }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="debug-info">
      <p>현재 슬라이드: {{ currentSlide }}</p>
      <p>Swiper 상태: {{ swiperReady ? '준비됨' : '로딩중' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentSlide = ref(0)
const swiperReady = ref(false)

const testSlides = ref([
  {
    title: '첫 번째 슬라이드',
    content: '스와이프 테스트 1번'
  },
  {
    title: '두 번째 슬라이드', 
    content: '스와이프 테스트 2번'
  },
  {
    title: '세 번째 슬라이드',
    content: '스와이프 테스트 3번'
  },
  {
    title: '네 번째 슬라이드',
    content: '스와이프 테스트 4번'
  }
])

const onSwiper = (swiper) => {
  console.log('Swiper initialized:', swiper)
  swiperReady.value = true
}

const onSlideChange = (swiper) => {
  console.log('Slide changed to:', swiper.activeIndex)
  currentSlide.value = swiper.activeIndex
}
</script>

<style scoped>
.simple-swiper-test {
  padding: 2rem;
  max-width: 60rem;
  margin: 0 auto;
}

.test-container {
  margin: 2rem 0;
  border: 2px solid #007bff;
  border-radius: 1rem;
  overflow: hidden;
}

.test-slide {
  background: linear-gradient(45deg, #007bff, #0056b3);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.test-slide h4 {
  font-size: 2.4rem;
  margin-bottom: 1rem;
}

.test-slide p {
  font-size: 1.6rem;
  margin: 0.5rem 0;
}

.debug-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
}

.debug-info p {
  margin: 0.5rem 0;
  font-weight: 500;
}
</style>
