<template>
  <section class="helpfulReview-section ml-n20 mr-n20">
    <div class="title-wrap">
      <p class="point">Choice Pick</p>
      <TitleBox :center="true" title="도움되는 리뷰" class="mb-0" />
    </div>
    <CommonSwiper
      :slides="bannerList"
      slide-type="custom"
      :slides-per-view="'auto'"
      :space-between="0"
      :slides-offset-before="10"
      :slides-offset-after="10"
      :navigation="false"
      :pagination="true"
      :scrollbar="false"
      :autoplay="false"
      :show-slide-length="false"
      :show-play-pause-button="false"
    >
      <!-- 커뮤니티 슬라이드 커스텀 템플릿 -->
      <template #default="{ slide }">
        <HelpfulReview
          :key="slide.id"
          :profile-image="slide.profileImgPath"
          :review-title="slide.reviewTitle"
          :review-text="slide.reviewText"
          :nickname="slide.nickname"
          :level="slide.level"
          :cate="slide.cate"
          :type="slide.type"
          :to="slide.link"
          :scope="slide.scope"
          :aria-label="slide.label"
          :banner-title="slide.title"
          :banner-text="slide.description"
        />
      </template>
    </CommonSwiper>
  </section>
</template>
<script setup lang="ts">
import TitleBox from '~/components/common/TitleBox.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import HelpfulReview from '~/components/publishing/community/home/HelpfulReview.vue'

const bannerList = ref([
  {
    id: 1,
    profileImgPath: 'community/img-rank-profile.png',
    nickname: '당근먹는다람쥐',
    level: 4,
    reviewTitle: '심박수가 왔다갔다 하는데, 원래 이런가요?',
    reviewText:
      '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋고 만족스러워요 맘에 드네요. 가족들한테도 하나씩 사줘야..',
    type: 'smartring',
    cate: '커뮤니티명',
    link: '#',
    scope: 5,
    label: '스마티링 커뮤니티 바로가기',
    title: '스마트링 바로가기',
    description: '나도써볼까? <br/>건강스마트링 자세히 알아보세요'
  },
  {
    id: 2,
    profileImgPath: 'community/img-rank-profile.png',
    nickname: '당근먹는다람쥐',
    level: 4,
    reviewTitle: '심박수가 왔다갔다 하는데, 원래 이런가요?',
    reviewText:
      '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋고 만족스러워요 맘에 드네요. 가족들한테도 하나씩 사줘야..',
    type: 'walkking',
    cate: '커뮤니티명',
    link: '#',
    scope: 4,
    label: '걷기왕 커뮤니티 바로가기',
    title: '걷기왕 바로가기',
    description: '같이 걸어요! <br/>걷기왕 챌린지 지금 참여하기!'
  },
  {
    id: 3,
    profileImgPath: 'community/img-rank-profile.png',
    nickname: '당근먹는다람쥐',
    level: 4.5,
    reviewTitle: '심박수가 왔다갔다 하는데, 원래 이런가요?',
    reviewText:
      '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋고 만족스러워요 맘에 드네요. 가족들한테도 하나씩 사줘야..',
    type: 'claimmaster',
    cate: '커뮤니티명',
    link: '#',
    scope: '4.5',
    label: '청구의신 커뮤니티 바로가기',
    title: '실손청구 바로가기',
    description: '헷갈리는 실손청구 <br/>간편하게 끝내기'
  },
  {
    id: 4,
    profileImgPath: 'community/img-rank-profile.png',
    nickname: '당근먹는다람쥐',
    level: 4,
    reviewTitle: '심박수가 왔다갔다 하는데, 원래 이런가요?',
    reviewText:
      '몸에 대한 변화를 즉각적으로 알 수 있으니까 너무 좋고 만족스러워요 맘에 드네요. 가족들한테도 하나씩 사줘야..',
    type: 'lemonhealth',
    cate: '커뮤니티명',
    link: '#',
    scope: 4,
    label: '레몬건강지수 커뮤니티 바로가기',
    title: '레몬건강지수 바로가기',
    description: '내 건강지수 몇점일까? <br/>지금 바로 체크하기'
  }
])
</script>
<style scoped lang="scss">
.helpfulReview-section {
  background: #dbe5fd;
  padding: 3.2rem 0 0;
  &:before {
    display: none;
  }

  :deep(swiper-slide) {
    width: 29rem;
  }

  :deep(::part(container)) {
    padding: 1.2rem 0 4.4rem;
  }

  :deep(::part(wrapper)) {
    // padding: 0 2rem;
  }
  :deep(swiper-container::part(pagination)) {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    bottom: 3.2rem;
    height: 0.8rem;
  }
  :deep(swiper-container::part(bullet-active)) {
    transform: none;
    margin: 0;
  }
  :deep(swiper-container::part(bullet)) {
    background: #fff;
    margin: 0;
    opacity: 1;
  }
}
.title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  .point {
    color: #4c7ff7;
  }
}
</style>
<!-- <style>
/* scoped 제거하고 전역으로 */
.custom-swiper swiper-container {
  --swiper-pagination-top: 20px;
  --swiper-pagination-bottom: auto;
}
</style> -->
