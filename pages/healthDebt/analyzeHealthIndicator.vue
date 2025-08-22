<template>
  <BaseBody page-title="레몬건강지수 분석" :show-back-button="true">
    <!-- <div>UI_HI_DF_01_레몬건강지수-분석하기</div> -->
    <h3 class="fz-18 bold mt-16 lineH-140">장동건님의 건강 프로필을 확인합니다.</h3>
    <p class="mt-4 medium lineH-140" style="color: #555">
      프로필 업데이트가 필요할 경우, 하단의 변경 버튼을 통해 최신 내용으로 업데이트 하실 수 있습니다.
    </p>
    <PersonalHealthProfile />
    <ButtonGroup gap="8">
      <Button btn-type="secondary" element-type="button" aria-label="프로필 업데이트" class="medium" />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="분석하기"
        class="medium"
        @click="openProgressDetailAnalysisModal"
      />
    </ButtonGroup>

    <!-- 정밀분석 진행하기 모달 -->
    <ConfirmModal
      :is-visible="showConfirmModal"
      :html="ConfirmModalContent"
      confirm-button-text="정밀분석 진행하기"
      cancel-button-text="닫기"
      @cancel="closeConfirmModal"
      @close="closeConfirmModal"
      @confirm="handleProgressDetailAnalysisConfirm"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import PersonalHealthProfile from '~/components/publishing/healthDebt/PersonalHealthProfile.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
const ConfirmModalContent = ref('')
const showConfirmModal = ref(false)
const handleProgressDetailAnalysisConfirm = () => {
  navigateTo('/healthDebt/detailAnalysisAgreeTerms')
  closeConfirmModal()
}
const openProgressDetailAnalysisModal = async () => {
  ConfirmModalContent.value = `
  <img src="/_nuxt/assets/images/walkingking/ico-warning.svg" alt="알림 이미지" style="margin: 0 auto"/>
    <div class="bold mt-6">
    레몬건강지수 분석이 완료되었습니다.
정밀분석을 진행하시겠습니까?
    </div>`

  showConfirmModal.value = true
}
const closeConfirmModal = () => {
  showConfirmModal.value = false
}
</script>

<style scoped lang="scss"></style>
