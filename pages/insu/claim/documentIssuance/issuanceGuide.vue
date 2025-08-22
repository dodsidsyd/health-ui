<template>
  <BaseBody
    :show-back-button="true"
    page-title="병원서류 이용안내"
    logo-type="text"
    :has-cart="true"
    :cart-count="2"
    class="pb-36"
  >
    <h1 class="c-tit mt-24">
      <span class="text"> 병원서류 발급 받는 방법 </span>
    </h1>
    <div class="c-tit-sub">
      온라인으로 받는 서류는 모두 사본이에요.<br />원본이 필요하시면 병원에 직접 방문해 주세요!
    </div>
    <CommonSwiper
      class="custom-swiper"
      :slides="imageSlides"
      slide-type="image"
      :slides-per-view="1"
      :navigation="false"
      :pagination="{ clickable: true }"
      :autoplay="false"
      :scrollbar="false"
      :show-play-pause-button="false"
      :loop="true"
    />
    <h1 class="c-tit mt-48">
      <span class="text"> 병원별 발급 가능 서류 안내 </span>
    </h1>
    <div class="c-tit-sub">모든 유료/무료 발급 서비스에 대해 1,100원<br />(VAT포함)의 발급 대행 수수료가 부가돼요</div>
    <Select
      class="mt-24"
      modal-title="발급할 병원을 선택해주세요"
      select-placeholder="병원을 선택해주세요"
      cancel-button-text="선택"
      :is-show-cancel-btn="false"
      :custom-opts="hospital"
    />
    <TableWrap :table-data="tableData" :table-class="'text-left mt-13'" />
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Select from '~/components/publishing/input/Select.vue'
import CommonSwiper from '~/components/publishing/swiper/CommonSwiper.vue'
import imgBanner1 from '@/assets/images/insu/docIssuance/img-doc-info01.png'
import imgBanner2 from '@/assets/images/insu/docIssuance/img-doc-info02.png'
import imgBanner3 from '@/assets/images/insu/docIssuance/img-doc-info03.png'
import imgBanner4 from '@/assets/images/insu/docIssuance/img-doc-info04.png'
import TableWrap from '~/components/common/tableWrap.vue'
definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})
const hospital = [
  { value: '강동성심병원', label: '강동성심병원' },
  { value: '서울아산병원', label: '서울아산병원' },
  { value: '삼성서울병원', label: '삼성서울병원' }
]

// swiper 이미지 슬라이더
const imageSlides = [imgBanner1, imgBanner2, imgBanner3, imgBanner4]

const tableData = {
  cols: [{ width: 'auto' }, { width: '10.4rem' }],
  headers: [
    [
      { type: 'th', text: '서류명' },
      { type: 'th', text: '발급비용', class: 'text-right' }
    ]
  ],
  body: [
    [{ text: '진단서 사본' }, { text: '1,000', class: 'text-right' }],
    [{ text: '입퇴원확인서인서' }, { text: '0원', class: 'text-right' }],
    [{ text: '외래진료사실증명서' }, { text: '0원', class: 'text-right' }],
    [{ text: '진료비영수증' }, { text: '0원', class: 'text-right' }],
    [{ text: '진료비세부내역서' }, { text: '0원', class: 'text-right' }],
    [{ text: '진료비납입증명서(연말정산용)' }, { text: '0원', class: 'text-right' }]
  ]
}
</script>

<style scoped lang="scss">
.custom-swiper {
  width: 100vw;
  margin-top: 3rem;
  margin: 3rem -2rem 0 -2rem;
  :deep(swiper-container) {
    &::part(container) {
      padding-bottom: 4rem;
    }
  }
  :deep(swiper-slide) {
    border-radius: 0;
  }
  :deep(.slide-info) {
    display: none;
  }
}
</style>
