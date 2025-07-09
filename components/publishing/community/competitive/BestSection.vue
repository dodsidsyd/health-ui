<template>
  <div class="best-section">
    <TitleBox class="mt-22" title="커뮤니티명 베스트 후기" :is-show-star="true" :rating="rating" />
    <Button btn-type="line" :aria-label="ariaLabel + '명의 후기 보러가기'"></Button>
    <CommonSwiper
      :slides="commList"
      slide-type="custom"
      :slides-per-view="1"
      :space-between="20"
      :navigation="false"
      :pagination="false"
      :scrollbar="false"
      :show-slide-info="false"
      :show-play-pause-button="false"
    >
      <template #default="{ slide, index }">
        <div class="review-slide">
          <CommItem :item="slide" :type="slide.type" :type-format="slide.typeFormat" />
        </div>
      </template>
    </CommonSwiper>
    <div>배너 영역</div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Button from '~/components/publishing/button/Button.vue'
import TitleBox from '~/components/common/TitleBox.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import CommItem from '~/components/publishing/community/competitive/CommItem.vue'

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
    cate: '자유게시판',
    badge: ['HOT', 'NEW'],
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 12,
    viewNum: 234,
    replyNum: 5,
    dateNum: '3시간',
    length: 3,
    type: ''
  },
  {
    id: 2,
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    likeNum: 48,
    viewNum: 1240,
    replyNum: 13,
    dateNum: '1일',
    length: 10,
    type: 'blue'
  },
  {
    id: 3,
    cate: '자유게시판',
    tit: '러닝할때 스마트링 활용해요 러닝할때 스마트링 활용해요',
    text: '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋음 짱좋음',
    dateNum: '1일',
    type: 'blue'
  },
  {
    id: 4,
    profileImg: '/images/user1.jpg',
    nickname: '라쿤파파',
    rating: 4.0,
    typeFormat: 'type2',
    isBlind: false
  }
]
</script>
<style lang="scss" scoped>
.review-slide {
  width: 100%;
  .community-box {
    display: block;
    background: #eee;
    padding: 2rem;
    border-radius: 1.2rem;
  }
}
</style>
