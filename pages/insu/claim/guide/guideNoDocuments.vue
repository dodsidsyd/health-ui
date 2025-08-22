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
        병원에 다녀오셨나요?<br />청구의신에서 간편하게 청구하세요!
      </span>
    </h1>
    <div class="wrap-guide-info">
      <img src="/assets/images/insu/guide/icon-easy.svg" alt="서류 필요 없이 손쉽게!" class="icon-info" />
      <div class="wrap-info">
        <div class="tit">서류 필요 없이 손쉽게!</div>
        <div class="tit-sub">병원에 안 가도 모든 진료내역을 찾아, 청구해 드려요.</div>
      </div>
    </div>
    <Button btn-type="primary" element-type="button" aria-label="청구 가능 병원 확인하기" class="mt-32" />
    <hr class="hr-section ml-n20 mr-n20 mt-32" />
    <h2 class="c-tit-guide">서류없이 하는 실손청구<br />따라해 볼까요?</h2>
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-01.svg" alt="1" />
      <div class="wrap-guide-text">
        <div class="tit">서류없이 청구 선택</div>
        <div class="tit-sub">청구의신 홈에서 서류없이 청구를 선택하세요.</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-nodoc-01.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-02.svg" alt="2" />
      <div class="wrap-guide-text">
        <div class="tit">다녀온 병원 선택</div>
        <div class="tit-sub">통원/입원 내역 중 청구할 병원을 선택하세요.</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-nodoc-02.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-03.svg" alt="3" />
      <div class="wrap-guide-text">
        <div class="tit">청구할 보험사 선택</div>
        <div class="tit-sub">주민등록번호를 입력하고 청구할 보험사를 선택하세요.</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-nodoc-03.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-04.svg" alt="4" />
      <div class="wrap-guide-text">
        <div class="tit">사고내용 입력 및 진료내역 선택</div>
        <div class="tit-sub">거의 다 왔어요! 사고내용 입력하고<br />진료내역을 선택하세요.</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-nodoc-04.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-05.svg" alt="5" />
      <div class="wrap-guide-text">
        <div class="tit">수익자 정보 입력</div>
        <div class="tit-sub">보험금 받을 분의 정보를 입력하세요.</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-nodoc-05.png" alt="" class="img-guides" />
    <div class="wrap-guide-num">
      <img src="/assets/images/insu/docIssuance/icon-num-06.svg" alt="6" />
      <div class="wrap-guide-text">
        <div class="tit">청구완료!</div>
        <div class="tit-sub">청구 신청이 간편하게 끝났어요!</div>
      </div>
    </div>
    <img src="/assets/images/insu/guide/img-nodoc-06.png" alt="" class="img-guides" />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" aria-label="서류없이 청구하러 가기" class="lg w-full medium btn-sticky" @click="clickNext" />
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
const lineActiveIndex = ref(0)
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
