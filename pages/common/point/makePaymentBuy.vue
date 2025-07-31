<template>
  <BaseBody page-title="결제" :show-back-button="true" :has-add-text-left="true" :add-text-left="'구매하기'">
    <div class="claim-gift-wrap">
      <div class="gift-detail-box">
        <img :src="imageName" alt="선물 이미지" />
        <div class="gift-detail-text">
          <span class="brand"> {{ brandName }}</span>
          <p class="gift-name">{{ giftName }}</p>
          <div class="cost-box">
            <p class="cost">{{ cost }}원</p>
            <span class="point">({{ calcPoint }}P)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-box-wrap">
      <div class="pay-box">
        <p class="tit">수량</p>
        <p class="num">2개</p>
      </div>
      <div class="pay-box">
        <p class="tit">결제금액</p>
        <p class="num">2,000원</p>
      </div>
      <div class="pay-box">
        <p class="tit">포인트 환산 금액</p>
        <p class="num">10,000P</p>
      </div>
      <div class="pay-box">
        <p class="tit">포인트 사용</p>
        <p class="num">3,570P</p>
        <div class="mt-16 w-full">
          <InputText placeholder="0" unit-r="P" />
        </div>
        <Checkbox id="checkBox1" aria-label="사용가능 전액" custom-style="left-label " class="mt-12 ml-auto" />
      </div>
      <div class="pay-box">
        <p class="tit">포인트 사용 할인 금액</p>
        <p class="num">-600원</p>
      </div>
    </div>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="1,400원 결제하기" class="lg w-full btn-sticky" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import RewardImage1 from '~/assets/images/lottery/img-reward-1.png'
import Checkbox from '~/components/publishing/input/check.vue'
const props = defineProps({
  imageName: { type: String, default: RewardImage1 },
  brandName: { type: String, default: '브랜드' },
  giftName: { type: String, default: '상품 이름' },
  cost: { type: String, default: '1,000' },
  calcPoint: { type: String, default: '5,000' }
})
</script>
<style scoped lang="scss">
.claim-gift-wrap {
  margin-top: 0.8rem;
  .gift-detail-box {
    display: flex;
    align-items: flex-start;
    img {
      width: 8.8rem;
      height: 8.8rem;
    }
    .gift-detail-text {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-left: 2rem;
      text-align: left;
      .cost-box {
        display: flex;
        align-items: flex-end;
        margin-top: 1.2rem;
        line-height: 2.2rem;
        .cost {
          font-weight: 700;
        }
        .point {
          margin-left: 0.4rem;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--blue-primary);
        }
      }
    }
  }
  .brand {
    display: inline-block;
    background: #e9ecef;
    padding: 0.3rem 0.6rem;
    border-radius: 0.3rem;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
  .gift-name {
    margin-top: 0.6rem;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
  .type {
    display: inline-block;
    margin-top: 1.2rem;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
}
.pay-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.6rem 0;
  font-size: 1.6rem;
  line-height: 2.2rem;
  border-bottom: 0.1rem solid #eee;
  &:last-child {
    border-bottom: none;
  }
  .tit {
    color: #555;
  }
  .num {
    font-weight: 500;
  }
}
</style>
