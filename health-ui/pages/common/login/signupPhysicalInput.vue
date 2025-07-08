<template>
  <BaseBody
    :show-back-button="true"
    page-title="회원가입"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    add-text-left="<span style='color:#999;font-size:1.4rem'>신체정보 입력</span>"
    class="pb-36"
  >
    <div class="flex flex-col gap-12 mt-24">
      <div class="sub-tit fz-16 bold">신체정보</div>
      <div class="input-container">
        <div class="flex flex-row gap-4">
          <InputText
            type="number"
            label="키 (Height / cm)"
            :is-valid="false"
            max-length="4"
            unit-r="cm"
            valid-text="키를 입력해주세요"
            placeholder=""
            class="flex-1"
          />
          <InputText
            type="number"
            label="몸무게 (Weight / kg)"
            :is-valid="false"
            maxLength="4"
            unit-r="kg"
            valid-text="몸무게를 입력해주세요."
            placeholder=""
            class="flex-1"
          />
        </div>
      </div>
      <!-- 기초대사량 정보창 -->
      <div class="flex flex-row metabolic-rate">
        <div class="info">
          <span class="info-tit">기초대사량</span>
          <strong class="info-txt">1,487 kal</strong>
        </div>
        <div class="info">
          <span class="info-tit">체질량지수</span>
          <strong class="info-txt">22.5 bmi</strong>
        </div>
      </div>

      <div class="contents-box">
        <div class="box-tit fz-14">신체정보를 입력해주세요.</div>
        <p class="box-txt fz-12">
          입력하신 신체정보를 기준으로 기초대사량과 체질량지수를 산출하고 일일 권장 걸음수와 권장 음식섭취량을
          제시합니다.
        </p>
      </div>
    </div>
    <!-- 비대칭 버튼 레이아웃 asymmetric  -->
    <ButtonGroup gap="0" asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" class="lg btn-sticky"> 이전 </Button>
      <Button btn-type="primary" element-type="button" class="lg btn-sticky"> 다음 </Button>
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

import InputText from '~/components/publishing/input/InputText.vue'
import InputMail from '~/components/publishing/input/InputMail.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
</script>
<style scoped lang="scss">
.input-container {
  width: 100%;
  overflow-x: hidden;
}

.metabolic-rate {
  background-color: #fff9df;
  border-radius: 0.8rem;
  padding: 1.6rem 2rem;
  gap: 0 3.2rem;
  .info {
    flex: 1 1 auto;
    display: flex;
    position: relative;
    justify-content: space-between;
    .info-tit {
      flex: 0 0 auto;
      font-weight: vars.$regular;
    }
    .info-txt {
      font-weight: vars.$semibold;
      color: vars.$blue-primary;
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      margin-top: -0.8rem;
      left: -1.6rem;
      width: 0.1rem;
      height: 1.6rem;
      background: #e2e2e2;
    }
    &:first-child {
      &::before {
        content: none;
      }
    }
  }
}

.contents-box {
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 2rem;
  border-radius: 0.8rem;
  .box-tit {
    font-weight: vars.$semibold;
    color: #2b2b2b;
  }
  .box-txt {
    font-weight: vars.$regular;
    color: #555555;
  }
}
</style>
