<template>
  <BaseBody :show-back-button="true" page-title="병원서류 발급" logo-type="text" :has-cart="true" :cart-count="2">
    <h1 class="c-tit mt-24">
      <span class="text"> 병원에 가지 않아도 쉽고 편하게<br />서류를 받을 수 있어요! </span>
    </h1>
    <div class="wrap-main">
      <div class="main-item sub1">
        <div class="tit">서류발급 신청</div>
        <div class="tit-sub">병원 방문없이<br />간편하게!</div>
      </div>
      <div class="main-item sub2">
        <div class="tit">의무기록<br />사본 발급</div>
      </div>
      <div class="main-item sub3">
        <div class="tit">처방전<br />조회/발급</div>
      </div>
    </div>
    <div class="wrap-document">
      <div class="wrap-document-header">
        <img src="/assets/images/insu/docIssuance/icon-folder.svg" alt="보관함" />
        <div class="wrap-text">
          <div class="tit">서류 보관함</div>
          <div class="desc">발급 받은 서류를 모아두었어요.</div>
        </div>
      </div>
      <i class="icon-arrow-right"></i>
    </div>
    <div class="wrap-grey mt-20">
      <h3 class="tit-sub">병원 서류는 어떻게 발급 받나요?</h3>
      <div class="issuance-information-lists">
        <div class="item">
          <img src="/assets/images/insu/docIssuance/icon-num-01.svg" alt="1" />
          <div class="wrap-text">
            <div class="tit">병원/서류 검색</div>
            <div class="desc">필요한 서류 발급이 가능한 병원인지 확인해 보세요.</div>
          </div>
        </div>
        <div class="item">
          <img src="/assets/images/insu/docIssuance/icon-num-02.svg" alt="1" />
          <div class="wrap-text">
            <div class="tit">진단서 사본 발급 선택</div>
            <div class="desc">진료 내역을 찾아 병원 방문없이 신청하세요.</div>
          </div>
        </div>
        <div class="item">
          <img src="/assets/images/insu/docIssuance/icon-num-03.svg" alt="1" />
          <div class="wrap-text">
            <div class="tit">발급 수수료 결제</div>
            <div class="desc">보관함에서 원하는 방식으로 내보내기 하세요.</div>
          </div>
        </div>
      </div>
      <div class="wrap-document-info">
        <div class="item">
          <div class="item-header">
            <img src="/assets/images/insu/docIssuance/icon-document.svg" alt="서류발급방법 확인" srcset="" />
            <div class="text">서류 발급 방법 확인하기</div>
          </div>
          <i class="icon-arrow-right"></i>
        </div>
        <div class="item">
          <div class="item-header">
            <img src="/assets/images/insu/docIssuance/icon-hospital.svg" alt="발급가능병원" srcset="" />
            <div class="text">발급 가능 병원 알아보기</div>
          </div>
          <i class="icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

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
.wrap-main {
  margin-top: 3.2rem;
  @include mixin.flex-container(items-center);
  flex-wrap: wrap;
  gap: 1.4rem;
  .main-item {
    padding: 1.6rem 2rem;
    border-radius: 1.2rem;
    position: relative;
    cursor: pointer;
    &.sub1 {
      width: 100%;
      height: 13.6rem;
      background: url('/assets/images/insu/docIssuance/icon-applydoc.png') no-repeat #4c7ff7;
      background-position: calc(100% - 1.8rem) calc(100% - 1.8rem);
      background-size: inherit;
    }
    &.sub2,
    &.sub3 {
      flex: 1;
      height: 15.6rem;
    }
    &.sub2 {
      background: url('/assets/images/insu/docIssuance/icon-applycopy.png') no-repeat #31519e;
      background-position: calc(100% - 1.8rem) calc(100% - 1.8rem);
      background-size: inherit;
    }
    &.sub3 {
      background: url('/assets/images/insu/docIssuance/icon-search-insurance.png') no-repeat #51658d;
      background-position: calc(100% - 1.8rem) calc(100% - 1.8rem);
      background-size: inherit;
    }
    .tit {
      font-size: 2rem;
      font-weight: 700;
      line-height: 130%;
      color: #fff;
    }
    .tit-sub {
      margin-top: 0.8rem;
      font-weight: 500;
      color: #fff;
    }
  }
}
.wrap-document {
  margin-top: 2rem;
  padding: 1.2rem 0;
  @include mixin.flex-container(justify-between items-center);
  cursor: pointer;
  .wrap-document-header {
    @include mixin.flex-container(items-center);
    gap: 1.2rem;
    .wrap-text {
      .tit {
        font-weight: 700;
      }
      .desc {
        margin-top: 0.2rem;
        font-size: 1.4rem;
        color: #555;
      }
    }
  }
  .icon-arrow-right {
    display: inline-block;
    width: 2.4rem;
    height: 2.4rem;
    background-image: url('/assets/images/insu/icon-arrow-right.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
}
.wrap-grey {
  position: relative;
  margin: 0 -2rem 0;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
  .tit-sub {
    font-size: 1.8rem;
    font-weight: 700;
  }
}
.issuance-information-lists {
  margin-top: 2.4rem;
  .item {
    @include mixin.flex-container(items-center);
    gap: 1.4rem;
    position: relative;
    &:not(:first-child) {
      margin-top: 2.4rem;
      &::before {
        content: '';
        background: url('/assets/images/insu/docIssuance/icon-dot.svg') center center no-repeat;
        background-size: contain;
        position: absolute;
        top: calc(-50% + 0.5rem);
        left: 1.2rem;
        width: 0.3rem;
        height: 1.4rem;
      }
    }
    .wrap-text {
      .tit {
        font-weight: 500;
      }
      .desc {
        margin-top: 0.2rem;
        font-size: 1.4rem;
        font-weight: 500;
        color: #959595;
      }
    }
  }
}
.wrap-document-info {
  margin-top: 2.4rem;
  padding: 1.6rem 2rem;
  border-radius: 1.2rem;
  background-color: #fff;
  .item {
    @include mixin.flex-container(justify-between items-center);
    &:not(:first-child) {
      border-top: 0.1rem solid #eeeeee;
      padding-top: 1.2rem;
      margin-top: 1.2rem;
    }
    .item-header {
      @include mixin.flex-container(items-center);
      gap: 1.2rem;
    }
    .icon-arrow-right {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url('/assets/images/insu/icon-arrow-right.svg');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
</style>
