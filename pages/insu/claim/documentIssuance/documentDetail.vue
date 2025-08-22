<template>
  <BaseBody
    page-title="병원서류 발급"
    logo-type="text"
    :has-close-btn="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="medical-info">
      <div class="medical-info-head">
        <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
        <div class="wrap-insurance-info">
          <div class="wrap-text">
            <div class="tit">강동성심병원</div>
          </div>
        </div>
      </div>
    </div>
    <hr class="hr-section ml-n20 mr-n20" />
    <div class="receipt-tit">진료비영수증</div>
    <div class="wrap-receipt-list">
      <div class="item">
        <div class="tit">진료일자</div>
        <div class="desc">2024.02.20</div>
      </div>
      <div class="item">
        <div class="tit">진료기간</div>
        <div class="desc">2023.10.23~2023.12.30</div>
      </div>
      <div class="item">
        <div class="tit">진료과</div>
        <div class="desc">신경내과</div>
      </div>
      <div class="item">
        <div class="tit">진료의</div>
        <div class="desc">홍길동</div>
      </div>
      <div class="item">
        <div class="tit">발급일자</div>
        <div class="desc">2024.02.20</div>
      </div>
      <div class="item">
        <div class="tit">발급매수</div>
        <div class="desc">2매</div>
      </div>
      <div class="item total">
        <div class="tit">총 발급비용</div>
        <div class="desc">11,100원</div>
      </div>
    </div>
    <div class="wrap-incidental-lists">
      <div class="item">
        <div class="desc">발급비용</div>
        <div class="price">10,000원</div>
      </div>
      <div class="item">
        <div class="desc">대행수수료</div>
        <div class="price">1,000원</div>
      </div>
      <div class="item">
        <div class="desc">대행수수료부가세</div>
        <div class="price">100원</div>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
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
.medical-info {
  margin-top: 2.4rem;
  border: 0.1rem solid #E2E2E2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  .medical-info-head {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-insurance-info {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .wrap-text {
        .tit {
          flex: 1;
          min-width: 0;
          font-weight: 700;
          @include mixin.ellipsis;
        }
      }
    }
  }
}
.receipt-tit {
  padding: 2.1rem 0;
  font-weight: 700;
}
.wrap-receipt-list {
  .item {
    padding: 1.6rem 0;
    @include mixin.flex-container(justify-between items-center);
    &:not(:first-child) {
      border-top: 0.1rem solid #EEEEEE;
    }
    &.total {
      .tit,
      .desc {
        font-weight: 700;
        color: #2B2B2B;
      }
    }
    .tit {
      margin-left: 0.4rem;
      color: #555555;
    }
    .desc {
      margin-right: 0.4rem;
      font-weight: 500;
    }
  }
}
.wrap-incidental-lists {
  border-radius: 1.2rem;
  background-color: #F4F4F4;
  padding: 1.6rem 2rem;
  .item {
    @include mixin.flex-container(justify-between items-center);
    &:not(:first-child) {
      margin-top: 1.2rem;
    }
    .desc {
      margin-left: 0.4rem;
      font-size: 1.4rem;
      color: #555555;
    }
    .price {
      margin-right: 0.4rem;
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
}
</style>
