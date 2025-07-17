<template>
  <BaseBody
    :show-back-button="true"
    page-title="사진찍어 청구"
    logo-type="text"
    :has-notification="true"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-60"
  >
    <div class="mt-24">
      <h1 class="c-tit">
        <span class="text">
          ARS & 상담원을 통해<br />안내 받은 팩스번호를 입력해 주세요
        </span>
      </h1>
    </div>
    <div class="wrap-connect-service">
      <div class="service-info">
        <div class="tit">신한라이프 고객센터</div>
        <div class="tit-sub">청구시 개인별로 발급되는 팩스번호가<br />필요해요. 고객센터로 문의해 주세요.</div>
      </div>
      <img class="img" src="/assets/images/insu/icon-call.svg" alt="고객센터" />
    </div>
    <div class="mt-32">
      <InputText
        label="팩스번호"
        :is-valid="false"
        class="require"
        valid-text="팩스번호를 입력해주세요."
        placeholder="팩스번호 입력"
      />
    </div>
    <div class="wrap-service-info">
      <div class="tit">보험사 고객센터로 전화하신 후<br />음성안내에 따라 팩스번호를 확인해 주세요.</div>
      <ul class="service-list">
        <li class="item">1번 (구 신한생명) 고객 또는 2번 (구 오렌지 라이프고객)</li>
        <li class="item">0번 상담사 통화연결</li>
        <li class="item">빠른 상담은 휴대폰번호와 #입력 (입력 원치않으면 #)</li>
        <li class="item">1번 (보험조회 / 변경 및 일반상담)</li>
      </ul>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="다음"
      class="lg w-full medium btn-sticky"
    >
      다음
    </Button>
  </ButtonGroup>

  
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import InputAddress from '~/components/publishing/input/InputAddress.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Select from '~/components/publishing/input/Select.vue'

const isShowModal = ref(false)

const movePage = () => {
  navigateTo('/insu/claim/inputBeneficiaryInfo')
}

const clickDiff = () => {
  movePage()
}

const clickSame = () => {
  movePage()
}

const clickNext = () => {
  // 사진찍어 청구: 피보험자, 수익자 동일인 여부 모달 띄우기
  isShowModal.value = true
  // 그외
  // return navigateTo('/insu/claim/inputAccidentData')
}
</script>

<style scoped lang="scss">
.wrap-connect-service {
  margin-top: 3.2rem;
  border-radius: 1.2rem;
  background-color: #E7F4FF;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  .service-info {
    .tit {
      font-weight: 700;
    }
    .tit-sub {
      margin-top: 0.8rem;
      color: #555555;
    }
  }
  .img {
    width: 4.8rem;
  }
}
.wrap-service-info {
  padding: 2rem;
  position: fixed;
  bottom: 5.6rem;
  background-color: #F9F9F9;
  left: 0;
  right: 0;
  .tit {
    font-size: 1.4rem;
    font-weight: 600;
  }
  .service-list {
    margin-top: 1.6rem;
    .item {
      padding-left: 2.2rem;
      font-size: 1.2rem;
      line-height: 130%;
      color: #555555;
      position: relative;
      counter-increment: num;
      &::before {
        content: counter(num);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background: #4F5561;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        font-weight: 500;
        line-height: 130%;
      }
      &:not(:first-child) {
        margin-top: 0.8rem;
      }
    }
  }
}
</style>
