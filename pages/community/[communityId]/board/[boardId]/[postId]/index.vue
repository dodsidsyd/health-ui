<template>
  <BaseBody
    :has-scrap="true"
    :has-share="true"
    page-title="커뮤니티명"
    :show-back-button="true"
    :is-transparent="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-menu'>메뉴 아이콘</span>"
  >
    <PostDetailTitleHeader
      :nickname="'당근먹는다람쥐'"
      :title="'러닝 후 간단히 먹을 수 있는 다이어트 를 위한 저녁식단 추천해요.'"
    />
    <PostDetailImageWrap>
      <!-- 
      <CommonSwiper
        :slides="imageSlides"
        slide-type="image"
        :slides-per-view="1"
        :space-between="20"
        :navigation="false"
        :pagination="{ clickable: true }"
        :autoplay="false"
        :scrollbar="false"
        :show-slide-info="false"
        :show-play-pause-button="false"
        :show-slide-length="false"
        :loop="true"
      />
       -->
    </PostDetailImageWrap>
    <PostDetailHashtagWrap :hashtags="['#저속화식단', '#저탄고지', '#고단백', '#식단공유', '#운동후식단병행']" />
    <PostDetailTextWrap>
      본문 내용이 표기됩니다. 한강 뛰고 와서 먹기좋은 초간단샐러드 추천해요. 저만의 식단인데, 일단 닭가슴살이랑 바나나
      그리고 양배추있으면 한 끼 뚝딱이에요.
    </PostDetailTextWrap>
    <PostDetailSummaryBox v-model:like-count="myLikeCount" :view-count="104" />
    <hr class="hr-section mg-24y ml-n20 mr-n20" />
    <PostDetailReactionBox />
    <hr class="hr-section mg-24y ml-n20 mr-n20" />
  </BaseBody>
</template>
<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import PostDetailTitleHeader from '~/components/publishing/community/board/PostDetailTitleHeader.vue'
import PostDetailImageWrap from '~/components/publishing/community/board/PostDetailImageWrap.vue'
import PostDetailHashtagWrap from '~/components/publishing/community/board/PostDetailHashtagWrap.vue'
import PostDetailTextWrap from '~/components/publishing/community/board/PostDetailTextWrap.vue'
import PostDetailSummaryBox from '~/components/publishing/community/board/PostDetailSummaryBox.vue'
import PostDetailReactionBox from '~/components/publishing/community/board/PostDetailReactionBox.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import imgBanner from '@/assets/images/community/img-community-02.png'
// 이미지 슬라이드 데이터 (로컬 이미지 사용)
const imageSlides = [imgBanner, imgBanner, imgBanner, imgBanner]
// 좋아요 반응형 변수
const myLikeCount = ref(104)
</script>
