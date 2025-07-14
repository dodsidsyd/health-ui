<template>
  <div class="we-comm-swiper">
    <CommonSwiper
      :slides="slideList"
      slide-type="custom"
      :slides-per-view="1.1"
      :space-between="12"
      :navigation="false"
      :pagination="false"
      :loop="true"
      :scrollbar="false"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="full-width-swiper"
    >
      <template #default="{ slide }">
        <div class="we-comm-slide">
          <p class="tit">{{ slide.tit }}</p>
          <strong class="text">{{ slide.text }}</strong>
          <component :is="slide.chartComponent" />
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
</script>
<style scoped lang="scss">
.full-width-swiper {
  width: calc(100% + 4rem);
  margin: 0 -2rem;
}
swiper-slide.swiper-slide-active {
  padding-left: 2rem;
}
.we-comm-slide {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  padding: 2.1rem 2rem 3.2rem;
  border-radius: 2rem;
  border: 1px solid #eee;
  background: #fff;
  height: 33.2rem;
  &:has(.chart-wrap) {
    padding-bottom: 2.6rem;
  }
  .tit {
    font-weight: 500;
    line-height: 2.2rem;
    color: #555;
    & + .text {
      margin-top: 0.8rem;
    }
  }
  .text {
    display: inline-block;
    font-size: 2rem;
    line-height: 2.6rem;
  }
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
  ::v-deep(swiper-slide) {
    &.swiper-slide-active {
      padding-left: 2rem;
    }
  }
}
</style>
