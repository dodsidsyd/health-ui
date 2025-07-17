<template>
  <BaseBody
    :show-back-button="true"
    page-title="약관보기"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-add-text-left="true"
    class="pb-36"
  >
    <div class="wrap-agree-detail flex flex-col gap-10 pb-48">
      <div class="fz-14 semibold">개인정보 수집 및 이용동의</div>
      <div class="agree-txt-box fz-14 mt-10">(주)레몬헬스케어는 개인(신용)정보를 수집 및 이용하 고자 [개인정보보호법] 제15조, 제17조, 제22조, 제24 조 및 [신용정보의 이용 및 보호에 관한 법률]제 32조, 제34조에 따라 아래와 같이 개인(신용)정보를 수집 맛 이용하고자 합니다.</div>
      <div class="fz-14 semibold">개인(신용)정보 수집 및 이용 목적</div>
      <div class="agree-txt-box">
        <ol class="bullet-type">
          <li>보험설계사 회원 가입</li>
          <li>기타 대리인 회원 가입</li>
          <li>보험설계사 또는 기타 대리인의 피보험자 대상 보험 금 대리 접수</li>
        </ol>
      </div>
      <div class="fz-14 semibold">개인(신용)정보 수집 및 이용 내역</div>
      <div class="agree-txt-box">
        <ol class="bullet-type">
          <li>보험설계사의 성명, 휴대번호</li>
          <li>기타 대리인의 성명, 휴대폰번호</li>
          <li>피보험자의 성명,생년월일,주소,휴대폰번호,은행계좌 정보,진료영수증 정보, 진료비 항목별 내역서 정보,진 단서 정보, 처방전 정보</li>
        </ol>
      </div>
    </div>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="확인"
      class="lg w-full medium btn-sticky"
      @click="clickNext"
    >
      동의하고 다음
    </Button>
  </ButtonGroup>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'

definePageMeta({
  title: '개인정보 수집 및 이용동의'
})

const clickNext = () => {
  // 설계사 가입하기 클릭한 경우
  navigateTo('/insu/claim/subrogation/serviceNotInUse/selectInsuranceCompany')
  // 설계사 대리인 가입하기 클릭한 경우
  //   navigateTo('/insu/claim/subrogation/serviceNotInUse/inputAgentInfo')
}
</script>

<style scoped lang="scss">
.wrap-agree-detail {
  text-align: left;
  .agree-txt-box {
    .bullet-type {
      list-style: none;
      counter-reset: list-counter;
      padding-left: 0;
      margin: 0;
  
      li {
        counter-increment: list-counter;
        position: relative;
        padding-left: 1.1rem;
        line-height: 140%;
        &:not(:first-child) {
          margin-top: 0.2rem;
        }
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.8rem;
          width: 0.3rem;
          height: 0.3rem;
          background-color:#959595;
        }
      }
    }
  }
}
</style>
