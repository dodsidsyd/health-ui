<template>
  <BaseBody
    :show-back-button="true"
    page-title="청구의신 이용안내"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <LineTabsStyle :tabs="lineTabs" :active-index="lineActiveIndex" @tab-click="handleLineTabClick" class="" />
    <h1 class="c-tit mt-24">
      <span class="text">
        서류 준비 되셨나요?<br />사진 찍어 쉽고 편하게 청구하세요!
      </span>
    </h1>
    <div class="wrap-guide-info">
      <img src="/assets/images/insu/guide/icon-doc.svg" alt="서류가 있으면 사진 찍어 청구!" class="icon-info" />
      <div class="wrap-info">
        <div class="tit">서류가 있으면 사진 찍어 청구!</div>
        <div class="tit-sub">병원 종류에 상관없이 간편하게 청구할 수 있어요.</div>
      </div>
    </div>
    <Button btn-type="primary" element-type="button" aria-label="청구 가능 병원 확인하기" class="mt-32" />
    <hr class="hr-section ml-n20 mr-n20 mt-32" />
    <h2 class="c-tit-guide">사진찍어 하는 실손청구<br />따라해 볼까요?</h2>
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-01.svg" alt="1" />
      <div class="wrap-guide-text">
        <div class="tit">서류없이 청구 선택</div>
        <div class="tit-sub">청구의신 홈에서 서류없이 청구를 선택하세요.</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-picture-01.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-02.svg" alt="2" />
      <div class="wrap-guide-text">
        <div class="tit">다녀온 병원 선택</div>
        <div class="tit-sub">실손 청구할 병원을 찾아 선택하세요. </div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-picture-02.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-03.svg" alt="3" />
      <div class="wrap-guide-text">
        <div class="tit">청구할 보험사 선택</div>
        <div class="tit-sub">주민등록번호를 입력하고 청구할 보험사를 선택하세요.</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-picture-03.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-04.svg" alt="4" />
      <div class="wrap-guide-text">
        <div class="tit">사고내용 및 수익자 정보 입력</div>
        <div class="tit-sub">사고내용 입력하고 보험금 받을 분의 정보를 입력해요.</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-picture-04.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-05.svg" alt="5" />
      <div class="wrap-guide-text">
        <div class="tit">청구 서류 사진 첨부</div>
        <div class="tit-sub">청구에 필요한 사진을 첨부하세요.</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-picture-05.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-06.svg" alt="6" />
      <div class="wrap-guide-text">
        <div class="tit">청구완료!</div>
        <div class="tit-sub">청구 신청이 간편하게 끝났어요!</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-picture-06.png" alt="" class="img-guides" />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="사진찍어 청구하러 가기" class="lg w-full medium btn-sticky" @click="clickNext" />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import LineTabsStyle, { type Tab } from '~/components/common/tab/LineTabs.vue'

// LineTabs 데이터
const lineTabs: Tab[] = [
  { name: '서류없이 청구', code: 'no-docs' },
  { name: '사진찍어 청구', code: 'photo-claim' },
  { name: '대리청구', code: 'application-claim' }
]
const lineActiveIndex = ref(1)
// 이벤트 핸들러들
const handleLineTabClick = (index: number) => {
  lineActiveIndex.value = index
  console.log('Line 탭 클릭:', lineTabs[index])
}

definePageMeta({
  // isShowHeader: false
  // isShowUtils: false
  // isShowBackButton: false,
  title: '대리청구 안내'
  // utils: ['phone']
  // customTitle: 'logo',
})

</script>

<style scoped lang="scss">
.c-tit-guide {
  margin: 3.2rem 0 2.4rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 130%;
}
.wrap-guide-info {
  margin-top: 1.6rem;
  @include mixin.flex-container(items-center);
  gap: 1rem;
  .icon-info {
    width: 4rem;
  }
  .wrap-info {
    .tit {
      font-weight: 700;
      color: #555555;
    }
    .tit-sub {
      margin-top: 0.2rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: #555555;
    }
  }
}
.wrap-guide-num {
  @include mixin.flex-container(items-start);
  gap: 0.8rem;
  .wrap-guide-text {
    .tit {
      font-size: 1.8rem;
      font-weight: 700;
    }
    .tit-sub {
      margin-top: 0.2rem;
      font-weight: 500;
      color: #555555;
    }
  }
}
.img-guides {
  margin: 1.6rem -2rem 0 -2rem;
  max-width: initial;
  + .wrap-guide-num {
    margin-top: 4.8rem;
  }
}
</style>
