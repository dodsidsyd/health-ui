<template>
  <BaseBody
    :show-back-button="true"
    page-title="서류없이 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="agree-wrap flex flex-col gap-10 pb-32 mt-40">
      <h1 class="c-tit">
        <span class="text">
          청구할 내용을 확인해 주세요
        </span>
      </h1>
    </div>
    <FlexSection>
      <div class="medical-info">
        <div class="medical-info-head">
          <img src="/assets/images/insu/logo_KUMedicine.svg" alt="로고" class="logo" />
          <div class="wrap-hospital">
            <div class="text">강동성심병원 강동성심병원 강동성심병원 강동성심병원 강동성심병원 강동성심병원 </div>
            <div class="label in">입원</div>
          </div>
          <div class="count"><strong>12</strong>건</div>
        </div>
        <div class="medical-info-desc">
          <div class="text">총 청구 진료비</div>
          <div class="price">8,600원</div>
        </div>
      </div>
    </FlexSection>
    <hr class="hr-section mt-32 ml-n20 mr-n20" />
    <div class="wrap-claim-detail">
      <h2 class="tit">청구내역</h2>
      <ul class="detail-list">
        <li class="item">
          <div class="tit">피보험자(치료 받은 분)</div>
          <div class="desc">이레몬</div>
        </li>
        <li class="item">
          <div class="tit">수익자(보험금 받는 분)</div>
          <div class="desc">이레몬</div>
        </li>
        <li class="item">
          <div class="tit">청구건수</div>
          <div class="desc">강남성심병원 1건</div>
        </li>
        <li class="item">
          <div class="tit">보험금 수령계좌</div>
          <div class="desc">국민은행(이레몬)<br/>1324567897897</div>
        </li>
        <li class="item">
          <div class="tit">청구 보험사</div>
          <div class="desc">신한라이프</div>
        </li>
      </ul>
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="청구하기" class="lg w-full medium btn-sticky" :disabled="hasSelectedHospitals" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

</script>

<style scoped lang="scss">
.wrap-claim-detail {
  margin: 0 -2rem 5.6rem;
  h2.tit {
    border-bottom: 0.1rem solid #EEEEEE;
    padding: 2rem;
    font-size: 1.6rem;
    font-weight: 700;
  }
  .detail-list {
    margin: 0 2rem;
    .item {
      padding: 1.6rem 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:not(:first-child) {
        border-top: 0.1rem solid #EEEEEE;
      }
      .tit {
        color: #555555;
      }
      .desc {
        font-weight: 500;
        text-align: right;
      }
    }
  }
}
.medical-info {
  border: 0.1rem solid #E2E2E2;
  border-radius: 1.2rem;
  padding: 1.2rem 2rem;
  .medical-info-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
    .logo {
      flex: 0 0;
      width: 4.8rem;
      height: auto;
    }
    .wrap-hospital {
      flex: 1 0 auto;
      max-width: calc(100% - 10rem);
      display: flex;
      align-items: center;
      gap: 0.4rem;
      .text {
        flex: 1;
        min-width: 0;
        font-weight: 700;
        @include mixin.ellipsis;
      }
      .label {
        display: inline-block;
        padding: 0.3rem 0.6rem;
        border-radius: 0.3rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 130%;
        // 통원
        &.out {
          background-color: #FEF4CC;
          color: #8D7000;
        }
        // 입원
        &.in {
          background-color: #FFE7E7;
          color: #CA2828;
        }
        // ToDo: medicalHistory.vue에서 '입원'일때 아래 color 사용. 확인 필요
        // &.in {
        //   background-color: #EAF2CC;
        //   color: #506A1D;
        // }
      }
    }
    .count {
      flex: 0 0;
      font-size: 1.4rem;
      font-weight: 600;
      strong {
        margin-right: 0.3rem;
        color: #4C7FF7;
      }
    }
  }
  .medical-info-desc {
    margin-top: 1.6rem;
    padding-top: 1.6rem;
    border-top: 0.1rem solid #EEEEEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      color: #555555;
    }
    .price {
      font-weight: 500;
      color: #4C7FF7;
    }
  }
}

</style>
