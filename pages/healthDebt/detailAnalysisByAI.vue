<template>
  <BaseBody page-title="레몬건강지수 AI 정밀분석" :show-back-button="true">
    <h2 class="lineH-130 bold mt-24">
      AI 정밀분석을 통해<br />
      내 레몬지수를 바로 확인해 보세요.
    </h2>
    <IntegrationMydataWrap
      class="mt-38"
      @update:is-updated="updateMyDataStatus"
      @open-modal="openProgressDetailAnalysisModal"
    />
    <IntegrationProfileWrap
      class="mt-16"
      @update:is-updated="updateProfileStatus"
      @open-modal="openProgressDetailAnalysisModal"
    />
    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="레몬지수 AI정밀 분석하기"
        class="lg btn-sticky medium w-full"
        :disabled="!isMainButtonActive"
        @click="handleProgressDetailAnalysis"
      />
    </ButtonGroup>

    <ConfirmModal
      :is-visible="showConfirmModal"
      :html="ConfirmModalContent"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
      :is-show-cancel-button="isShowCancelButton"
      @cancel="closeConfirmModal"
      @close="closeConfirmModal"
      @confirm="handleToDownloadMydata"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import IntegrationMydataWrap from '~/components/publishing/healthDebt/IntegrationMydataWrap.vue'
import IntegrationProfileWrap from '~/components/publishing/healthDebt/IntegrationProfileWrap.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'

const isMyDataUpdated = ref(false)
const isProfileUpdated = ref(false)

const updateMyDataStatus = (isUpdated: boolean) => {
  isMyDataUpdated.value = isUpdated
}

const updateProfileStatus = (isUpdated: boolean) => {
  isProfileUpdated.value = isUpdated
}

const isMainButtonActive = computed(() => {
  return isMyDataUpdated.value && isProfileUpdated.value
})

const ConfirmModalContent = ref('')
const showConfirmModal = ref(false)
const confirmButtonText = ref('업데이트')
const cancelButtonText = ref('취소')
const isShowCancelButton = ref(true)
const handleProgressDetailAnalysis = async () => {
  ConfirmModalContent.value = `<img src="/_nuxt/assets/images/walkingking/ico-warning.svg" alt="알림 이미지" style="margin: 0 auto"/>
    <div class="fz-18 bold mt-6">레몬지수 AI 정밀분석이 완료되었습니다.</div>`

  isShowCancelButton.value = false
  confirmButtonText.value = '확인'
  showConfirmModal.value = true
}

const openProgressDetailAnalysisModal = async () => {
  ConfirmModalContent.value = `
  <img src="/_nuxt/assets/images/walkingking/ico-warning.svg" alt="알림 이미지" style="margin: 0 auto"/>
    <div class="fz-18 bold mt-6">
업데이트 하시겠습니까?
    </div>
    <p class="fz-14 mt-8">건강 프로필을 업데이트하시면 레몬지수가 재계산됩니다.</p>`

  isShowCancelButton.value = true
  confirmButtonText.value = '업데이트'
  showConfirmModal.value = true
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
}
const handleToDownloadMydata = () => {
  if (confirmButtonText.value === '확인') {
    navigateTo('/healthDebt/myMedicalDataDownload')
  } else {
    showConfirmModal.value = false
  }
}
</script>

<style scoped lang="scss"></style>
