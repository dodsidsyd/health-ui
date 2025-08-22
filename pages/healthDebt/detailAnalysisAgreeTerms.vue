<template>
  <BaseBody page-title="레몬건강지수 AI 정밀분석" :show-back-button="true">
    <!-- <div>UI_HI_AN_01_레몬건강지수-AI정밀분석-약관동의</div> -->
    <h2 class="lineH-130 bold mt-24">건강 프로필과 의료정보를 분석하여 정밀한 레몬건강지수 데이터를 도출합니다.</h2>
    <p class="mt-16 fz-18 medium lineH-140" style="color: #555">서비스 이용을 위한 약관 동의가 필요합니다.</p>

    <div class="agree-wrap mt-40">
      <Checkbox
        id="agreeAll"
        :model-value="agreeAll"
        custom-style="button w-full agree-all"
        aria-label="전체 동의"
        @update:model-value="handleAgreeAllChange"
      />
      <div class="agree-list mt-24 pb-48 pl-16 pr-16">
        <ul class="flex flex-col gap-16 mb-16">
          <li class="flex flex-row">
            <Checkbox
              id="chk1"
              v-model="agreements.terms1"
              custom-style="small non-border"
              aria-label="레몬지수 관리 서비스 제공을 위한 개인(신용) 정보 수집 및 이용동의"
            />
            <ArrowButton class="ml-auto" aria-label="서비스 이용 약관 상세보기" @click="handleTermsClick('terms1')" />
          </li>
          <li class="flex flex-row">
            <Checkbox
              id="chk2"
              v-model="agreements.terms2"
              custom-style="small non-border"
              aria-label="레몬지수 관리 서비스 제공을 위한 민감정보의 수집 및 이용에 대한 동의"
            />
            <ArrowButton
              class="ml-auto"
              aria-label="개인정보 수집 및 이용 약관 상세보기"
              @click="handleTermsClick('terms2')"
            />
          </li>
        </ul>
      </div>
    </div>
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="레몬지수 AI정밀 분석하기"
        class="lg btn-sticky medium w-full"
        :disabled="!requiredAgreements"
        @click="handleProgressDetailAnalysis"
      />
    </ButtonGroup>

    <!-- 약관 모달 -->
    <FullModal
      :title="fullModalProps.title"
      :is-visible="isShowFullModal"
      :is-show-confirm-button="fullModalProps.isShowConfirmButton"
      :confirm-button-text="fullModalProps.confirmButtonText"
      :is-show-cancel-button="fullModalProps.isShowCancelButton"
      :is-show-close-button="fullModalProps.isShowCloseButton"
      @cancel="clickFullCancel"
      @confirm="clickFullConfirm"
      @close="toggleFullModal"
    >
      <template #content>
        <div class="agree-txt-box fz-14 flex flex-col gap-2 text-left">
          <div class="semibold">
            민감정보의 수집 및 이용에 대한동의 [레몬건강지수 / 건강부채 서비스 제공을 위한 민감정보의 수집, 이용하는
            민감정보
          </div>

          아래사항은 회사가 건강부채 서비스 제공을 위하여 수집, 이용하는 민감정보입니다. 이에 관하여 동의하지 않을 수
          있으나, 동의하지 않을 경우 레몬건강지수 및 건강부채 서비스를 이용하실 수 있습니다.
        </div>
      </template>
    </FullModal>
  </BaseBody>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import ArrowButton from '~/components/publishing/button/ArrowButton.vue'
import FullModal from '~/components/common/modal/FullModal.vue'

// 약관 타입 정의
type TermsType = 'terms1' | 'terms2'

// 개별 약관 동의 상태
const agreements = ref({
  terms1: false,
  terms2: false
})
const handleProgressDetailAnalysis = () => {
  console.log('?')
  navigateTo('/healthDebt/detailAnalysisByAI')
}
// 전체 동의 상태
const agreeAll = ref(false)
// 모달 관련 상태
const selectedTermsType = ref<TermsType>('terms1')
// 전체 동의 체크박스 클릭 함수
const handleAgreeAllChange = (checked: boolean) => {
  agreeAll.value = checked
  // 모든 개별 체크박스를 동일한 상태로 설정
  Object.keys(agreements.value).forEach(key => {
    agreements.value[key as keyof typeof agreements.value] = checked
  })
}
// 개별 약관 상태 변경 시 전체 동의 상태 업데이트
watch(
  agreements,
  newAgreements => {
    const allAgreed = Object.values(newAgreements).every(agreed => agreed)

    agreeAll.value = allAgreed
  },
  { deep: true }
)
// 필수 약관들이 모두 동의되었는지 확인
const requiredAgreements = computed(() => {
  return agreements.value.terms1 && agreements.value.terms2
})
// 각 약관 상세보기 클릭(클릭시 상세 팝업 이동)
const isShowFullModal = ref(false)
const handleTermsClick = (termsType?: TermsType) => {
  if (termsType) {
    selectedTermsType.value = termsType
  }
  isShowFullModal.value = true
}

// FullModal 관련 함수들
const fullModalProps = computed(() => ({
  title: getTermsTitle(selectedTermsType.value),
  isVisible: isShowFullModal.value,
  isShowConfirmButton: true,
  confirmButtonText: '닫기',
  cancelButtonText: '동의안함',
  isShowCancelButton: false,
  isShowCloseButton: true
}))
const toggleFullModal = () => {
  isShowFullModal.value = !isShowFullModal.value
}
const clickFullCancel = () => {
  isShowFullModal.value = false
}
const clickFullConfirm = () => {
  isShowFullModal.value = false
}

const getTermsTitle = (type: TermsType): string => {
  const titles = {
    terms1: '진료기록 및 건강기록 열람지원 민감정보 수집 및 이용동의',
    terms2: '진료기록 및 건강기록 열람지원 개인정보 수집 및 이용동의'
  }
  return titles[type] || '약관'
}
</script>

<style scoped lang="scss"></style>
