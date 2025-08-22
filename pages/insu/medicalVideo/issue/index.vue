<template>
  <BaseBody page-title="의료영상발급" :show-back-button="true" :has-notification="true" class="pb-46">
    <section class="medical-issue-section">
      <!-- 타이틀 영역 -->
      <TitleSection
        title="촬영한 의료영상을<br />다른병원에 공유할 수 있어요"
        description="레몬 페이로 결제하여 의료영상을 저장하고 다른 병원에 영상을 공유하거나 CD로 배송 받을 수 있어요."
      >
        <template #content>
          <div class="service-help">
            <i class="icon ico-info3" aria-hidden="true"></i>
            <span>환자번호를 보유한 제휴병원만 공유할 수 있어요.</span>
          </div>
        </template>
      </TitleSection>

      <div class="video-icon-box">
        <div class="video-icon">
          <img src="~/assets/images/insu/ico-medical-video-issue.svg" alt="의료영상 발급 안내" />
        </div>
      </div>

      <MedicalGuide />

      <ButtonGroup class="is-fixed half">
        <Button aria-label="발급대기함" btn-type="secondary" element-type="button" class="lg" />
        <Button aria-label="발급받기" btn-type="primary" element-type="button" class="lg" @click="handleIssueClick" />
      </ButtonGroup>

      <ConfirmModal
        :is-visible="isShowNoHospitalModal"
        title="제휴병원 연결이 필요해요."
        content="연결한 제휴병원의 의료영상을 발급 받을 수 있어요."
        :is-show-cancel-button="false"
        confirm-button-text="제휴병원 연결"
        @confirm="handleModalConfirm"
        @close="handleModalClose"
      />
    </section>
  </BaseBody>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import TitleSection from '~/components/insu/TitleSection.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
import MedicalGuide from '~/components/insu/MedicalGuide.vue'

const router = useRouter()

const affiliatedHospitalCount = 0
const isShowNoHospitalModal = ref(false)

// 발급받기 버튼 클릭 핸들러
const handleIssueClick = () => {
  if (affiliatedHospitalCount === 0) {
    // 제휴병원이 0건인 경우 모달 표시
    isShowNoHospitalModal.value = true
  } else {
    // 제휴병원이 있는 경우 정상 처리
    handleNormalIssue()
  }
}

// 모달 확인 버튼 클릭 핸들러
const handleModalConfirm = () => {
  isShowNoHospitalModal.value = false
  // 필요한 경우 제휴병원 등록 페이지로 이동
  router.push('/insu/medicalVideo/issue/search')
}

// 모달 닫기 핸들러
const handleModalClose = () => {
  isShowNoHospitalModal.value = false
}

// 정상 발급 처리
const handleNormalIssue = () => {
  // 발급 로직 구현
  router.push('/insu/medicalVideo/issue/search')
}
</script>

<style lang="scss" scoped>
.medical-issue-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem 0 0;
}

.service-help {
  display: flex;
  gap: 0.4rem;
  .icon {
    width: 2rem;
    height: 2rem;
  }
  span {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2rem;
    color: #555;
  }
}

.video-icon-box {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .video-icon {
    display: flex;
    width: 18.3rem;
    height: 16.6rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
