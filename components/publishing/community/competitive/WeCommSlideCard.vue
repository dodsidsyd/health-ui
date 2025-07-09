<template>
  <div>
    <CommonSwiper
      :slides="slideList"
      slide-type="custom"
      :slides-per-view="1"
      :space-between="20"
      :navigation="false"
      :pagination="false"
      :scrollbar="false"
      :show-slide-info="false"
      :show-play-pause-button="false"
    >
      <template #default="{ slide }">
        <div class="review-slide">
          <p class="tit">{{ slide.tit }}</p>
          <strong class="text">{{ slide.text }}</strong>
          <div>그래프 영역</div>
        </div>
      </template>
    </CommonSwiper>
  </div>
</template>
<script setup lang="ts">
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
defineProps<{
  data: {
    id: number
    tit: string
    text: string
  }
}>()
const slideList = [{ id: '1', tit: 'teste', text: 'asdfasdf' }]
</script>
<style scoped lang="scss"></style>
