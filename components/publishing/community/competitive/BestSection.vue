<template>
  <div class="best-section">
    <TitleBox class="mt-32" title="커뮤니티명 베스트 후기" :is-show-star="true" :rating="rating" />

    <CommonSwiper
      :slides="commList"
      slide-type="custom"
      :slides-per-view="1.2"
      :space-between="0"
      :navigation="false"
      :pagination="false"
      :scrollbar="false"
      :loop="true"
      :show-slide-info="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
      class="full-width-swiper"
    >
      <template #default="{ slide }">
        <div class="review-slide">
          <CommItem :item="slide" :type="slide.type" :type-format="slide.typeFormat" />
        </div>
      </template>
    </CommonSwiper>
    <Button btn-type="line" :aria-label="ariaLabel + '명의 후기 보러가기'" class="br-8 mt-20" />
    <div class="best-banner mt-32">
      <img src="~/assets/images/community/img-best-banner.svg" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
import TitleBox from '~/components/common/TitleBox.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import CommItem from '~/components/publishing/community/common/CommItem.vue'

const rating = '4.0'
const number = '1234'

const numFormat = computed(() => {
  const num = Number(number)
  return isNaN(num) ? '0' : num.toLocaleString()
})
const ariaLabel = numFormat
const props = defineProps({})

const commList = [
  {
    id: 1,
    cate: [{ label: '자유게시판', type: 'blue' }],
    dateNum: '3시간',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 4,
    typeFormat: 'type2',
    profileImageUrl: 'community/img-rank-profile.png',
    nickname: '라쿤파파',
    rating: 4.0
  },
  {
    id: 2,
    cate: [{ label: '자유게시판', type: 'blue' }],
    dateNum: '3시간',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    length: 2,
    typeFormat: 'type2',
    profileImageUrl: 'community/img-rank-profile.png',
    nickname: '라쿤파파',
    rating: 4.0
  },
  {
    id: 3,
    cate: [{ label: '자유게시판', type: 'blue' }],
    dateNum: '3시간',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    typeFormat: 'type2',
    profileImageUrl: 'community/img-rank-profile.png',
    nickname: '라쿤파파',
    rating: 4.0
  },
  {
    id: 4,
    cate: [{ label: '자유게시판', type: 'blue' }],
    dateNum: '3시간',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    src: 'community/img-community-01.png',
    typeFormat: 'type2',
    profileImageUrl: 'community/img-rank-profile.png',
    nickname: '라쿤파파',
    rating: 4.0
  }
]
</script>
<style lang="scss" scoped>
.full-width-swiper {
  width: calc(100% + 4rem);
  margin: 0 -2rem;
}
::v-deep(swiper-slide) {
  padding: 0 0.6rem;
  &.swiper-slide-active {
    padding-left: 2rem;
  }
}
.review-slide {
  width: 100%;
  .community-box {
    display: block;
    background: #f4f4f4;
    padding: 2rem;
    border-radius: 1.2rem;
  }
}
.best-banner {
  overflow: hidden;
  width: 100%;
  border-radius: 1.2rem;
  img {
    width: 100%;
    object-fit: cover;
  }
}
</style>
