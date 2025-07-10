<template>
  <div class="we-comm-swiper">
    <CommonSwiper
      :slides="slideList"
      slide-type="custom"
      :slides-per-view="1.1"
      :space-between="12"
      :navigation="false"
      :pagination="false"
      :scrollbar="false"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
    >
      <template #default="{ slide }">
        <div class="we-comm-slide">
          <p class="tit">{{ slide.tit }}</p>
          <strong class="text">{{ slide.text }}</strong>
          <div class="chart"><component :is="slide.chartComponent" /></div>
        </div>
      </template>
    </CommonSwiper>
  </div>
</template>
<script setup lang="ts">
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
defineProps<{
  data: {
    tit: string
    text: string
  }
}>()
const ActivityChart = defineAsyncComponent(() => import('~/components/publishing/community/chart/ActivityChart.vue'))
const AgeChart = defineAsyncComponent(() => import('~/components/publishing/community/chart/AgeChart.vue'))
const GenderChart = defineAsyncComponent(() => import('~/components/publishing/community/chart/GenderChart.vue'))

const slideList = [
  { id: 1, tit: '활동', text: '금요일에 활발해요!', chartComponent: ActivityChart },
  { id: 2, tit: '연령', text: '30대가 가장 많아요', chartComponent: AgeChart },
  { id: 3, tit: '성별', text: '여성이 더 많아요', chartComponent: GenderChart }
]
onMounted(() => {
  requestAnimationFrame(() => {
    const swiperEl = document.querySelector('swiper-container')
    const shadowRoot = swiperEl?.shadowRoot

    const swiper = shadowRoot?.querySelector('.swiper')
    swiper?.style.setProperty('overflow', 'visible', 'important')

    const wrapper = shadowRoot?.querySelector('.swiper-wrapper')
    wrapper?.style.setProperty('overflow', 'visible', 'important')
  })
})
</script>
<style scoped lang="scss">
.we-comm-slide {
  overflow: auto;
  width: 100%;
  padding: 2rem 2rem 3.2rem;
  border-radius: 2rem;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0px 0px 2.3rem 0px rgba(0, 0, 0, 0.06);
}
.we-comm-swiper {
  ::v-deep(.swiper),
  ::v-deep(swiper-slide),
  ::v-deep(swiper-container) {
    overflow: visible;
  }
  .custom-swiper {
    .swiper {
      overflow: visible;
    }
  }
}
::v-deep(.swiper),
::v-deep(swiper-slide),
::v-deep(swiper-container) {
  overflow: visible;
}
</style>
