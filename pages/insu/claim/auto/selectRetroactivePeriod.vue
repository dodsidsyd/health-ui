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
      <span class="text"> 자동청구 소급기간을<br />선택해 주세요. </span>
    </h1>
    <div class="wrap-info-text">
      <i class="info" alt="info"></i>
      <div class="text">설정한 금액 미만은 자동청구 진행하지 않아요</div>
    </div>
    <FlexColDiv class="gap-12">
      <Radio
        id="rdo1"
        name="rdo1"
        custom-style="button"
        aria-label="3년전 진료까지 자동청구"
        icon="check"
        icon-type="check"
        class="w-full text-left"
      />
      <Radio
        id="rdo2"
        name="rdo1"
        custom-style="button"
        aria-label="타이틀 텍스트"
        icon="check"
        icon-type="check"
        class="w-full text-left"
      />
      <Radio
        id="rdo3"
        name="rdo1"
        custom-style="button"
        aria-label="타이틀 텍스트"
        icon="check"
        icon-type="check"
        class="w-full text-left"
      />
      <Radio
        id="rdo4"
        name="rdo1"
        custom-style="button"
        aria-label="타이틀 텍스트"
        icon="check"
        icon-type="check"
        class="w-full text-left"
      />
    </FlexColDiv>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button
      btn-type="primary"
      element-type="button"
      aria-label="다음"
      class="lg w-full medium btn-sticky"
      @click="clickNext"
    />
  </ButtonGroup>
</template>

<script setup lang="ts">
// 타입지정 필요
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import Radio from '~/components/publishing/input/radio.vue'
const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(false)

// 전체선택 상태
const selectAll = ref<boolean>(false)

// 개별 병원 체크박스 상태 배열 (6개 병원)
const hospitalChecks = ref<boolean[]>([false, false, false, false, false, false])

// 전체선택/해제 처리
const handleSelectAll = (): void => {
  if (selectAll.value) {
    // 전체선택이 체크된 경우: 모든 병원을 체크
    hospitalChecks.value = hospitalChecks.value.map(() => true)
  } else {
    // 전체선택이 해제된 경우: 모든 병원을 해제
    hospitalChecks.value = hospitalChecks.value.map(() => false)
  }
}

// 개별 체크박스 변경 시 전체선택 상태 업데이트
const handleIndividualCheck = (): void => {
  // 모든 병원이 체크되었는지 확인
  const allChecked = hospitalChecks.value.every((check: boolean) => check === true)
  // 모든 병원이 체크되지 않았는지 확인
  const allUnchecked = hospitalChecks.value.every((check: boolean) => check === false)

  if (allChecked) {
    // 모든 병원이 체크된 경우: 전체선택도 체크
    selectAll.value = true
  } else if (allUnchecked) {
    // 모든 병원이 해제된 경우: 전체선택도 해제
    selectAll.value = false
  } else {
    // 일부만 체크된 경우: 전체선택 해제 (indeterminate 상태)
    selectAll.value = false
  }
}

// 다음 버튼 클릭 처리
const clickNext = (): void => {
  // 선택된 병원들 처리 로직
  const selectedHospitals = hospitalChecks.value
    .map((checked: boolean, index: number) => (checked ? index + 1 : null))
    .filter((index: number | null) => index !== null)

  console.log('선택된 병원:', selectedHospitals)
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
.wrap-info-text {
  margin-top: 1.6rem;
  margin-bottom: 3.2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  .info {
    width: 2rem;
    height: 2rem;
    background: url('/assets/images/insu/icon-info.svg') center center no-repeat;
    background-size: 100%;
  }
  .text {
    font-size: 1.4rem;
    font-weight: 500;
    color: #959595;
  }
}
</style>
