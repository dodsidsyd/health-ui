<template>
  <BaseBody>
    <section>
      <!--
        Swiper Container Options
        - pagination : pagindation bullet 표시 활성
        - autoplay: autoplay 활성 설정
         - delay: autoplay 시간
        - slides-per-view: 한 화면 노출 슬라이드 수
        - space-between: 슬라이드 간격 px
      -->
      <!-- swiper 시작 -->
      <ClientOnly>
        <swiper-container ref="swiperContainerRef" :pagination="true" :autoplay="true">
          <swiper-slide v-for="(slide, idx) in slides" :key="idx" :init="false">
            <div>
              {{ idx }}
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
      <!-- optional buttons -->
      <button @click="swiper.prev()">Prev</button>
      <button @click="swiper.next()">Next</button>
      <!-- swiper 종료 -->
    </section></BaseBody
  >
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

const swiperContainerRef = ref(null)
const slides = ref(Array.from({ length: 10 }))
const swiper = useSwiper(swiperContainerRef)
</script>

<style scoped lang="scss">
//sample css
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
//sample css 페이지네이션 bullet 커스텀 선택자
swiper-container::part(bullet) {
  background-color: gray;
  height: 2px;
  width: 0.625rem;
  opacity: 1;
}
//sample css 페이지네이션 bullet 커스텀 선택자 - 활성 페이지
swiper-container::part(bullet-active) {
  background-color: red;
  height: 2px;
  width: 0.625rem;
}
</style>
