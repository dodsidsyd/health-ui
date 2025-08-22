<template>
  <BaseBody
    :show-back-button="true"
    page-title="자동청구 신청"
    logo-type="text"
    :has-notification="true"
    :has-tel-btn="true"
    class="pb-60"
  >
    <h1 class="c-tit mt-24">
      <span class="text"> 자동청구 신청 내용을<br />확인해 주세요. </span>
    </h1>

    <HospitalListAccordion :hospital-list="hospitalList" />
    <AutoClaimDetail :claim-details="details" />
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="자동청구 신청하기"
      class="lg w-full medium btn-sticky"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import HospitalListAccordion from '~/components/insu/HospitalListAccordion.vue'
import AutoClaimDetail, { type ClaimDetailItem } from '~/components/insu/AutoClaimDetail.vue'

const hospitalList = [
  { logo: '/insu/auto/logo-ku-medicien.svg', name: '고려대학교구로병원' },
  { logo: '/insu/auto/logo-yonsei.svg', name: '가톨릭관동대국제성모병원' },
  { logo: '/insu/auto/logo-asan-foundation.svg', name: '가천대길병원' },
  { logo: '/insu/auto/logo-yonsei.svg', name: '단국대학교병원' },
  { logo: '/insu/auto/logo-yonsei.svg', name: '연세대학교병원' },
  { logo: '/insu/auto/logo-yonsei.svg', name: '연세대학교병원' },
  { logo: '/insu/auto/logo-yonsei.svg', name: '연세대학교병원' },
  { logo: '/insu/auto/logo-yonsei.svg', name: '연세대학교병원' }
]
const details: ClaimDetailItem[] = [
  { type: 'text', title: '청구 보험사', desc: 'DB손해보험' },
  { type: 'text', title: '지급계좌', desc: '국민은행(이레몬) 132448468454684' },
  {
    type: 'select',
    title: '자동청구 진료비',
    options: [
      { value: '1만원 이상', label: '1만원 이상' },
      { value: '2만원 이상', label: '2만원 이상' },
      { value: '5만원 이상', label: '5만원 이상' },
      { value: '10만원 이상', label: '10만원 이상' }
    ]
  },
  { type: 'text', title: '주소', desc: '경기도 수원시 장안구 덕영대로 123번길 13 의왕 푸르지오 302동 1505호' },
  { type: 'text', title: '직업', desc: '직장인' },
  { type: 'text', title: '이메일', desc: 'abcde@naver.com' }
]
</script>
