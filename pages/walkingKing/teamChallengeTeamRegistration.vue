<template>
  <BaseBody page-title="챌린지 참가하기" :show-back-button="true">
    <FlexColDiv class="gap-12">
      <InputText v-model="challengeName" label="챌린지명*" :disabled="true" />
      <InputText v-model="challengeType" label="참가방식*" :disabled="true" />
      <InputText v-model="teamName" label="팀명*" />
      <InputText v-model="introduceTeam" label="팀소개*" />
      <TeamProfileImage />
    </FlexColDiv>
  </BaseBody>
  <ButtonGroup class="is-fixed">
    <Button btn-type="primary" element-type="button" :aria-label="buttonAriaLabel" class="w-full lg btn-sticky" />
  </ButtonGroup>
  <!-- 챌린지 참가하기 모달 -->
  <BottomModal
    :is-visible="isShowBottomModal"
    v-bind="bottomModalProps"
    @close="toggleBottomModal"
    @confirm="handleConfirm"
    @cancel="handleCancle"
  >
    <template #content> <JoinChallengeModal /></template>
  </BottomModal>

  <BottomToastSlot v-model="showToast" type="success" :duration="3000">
    <p>참가신청이 완료되었습니다.</p></BottomToastSlot
  >

  <!-- 무료참가 선택 시 -->
  <BaseModal
    :is-visible="isShowAttendFreeModal"
    v-bind="AttendFreeModalProps"
    @close="toggleAttendFreeModal"
    @cancel="toggleAttendFreeModal"
    @confirm="onAttendFreeConfirm"
  >
    <template #content>
      <ChallengeAttendConfirm
        :title="'무료참가의 경우 챌린지 최종순위의 혜택은 받을 수 없습니다.'"
        :subtit="'무료로 참가 신청하시겠습니까?'"
      />
    </template>
  </BaseModal>
  <!-- 유료참가 선택 시 -->
  <BaseModal
    :is-visible="isShowAttendPaidModal"
    v-bind="AttendPaidModalProps"
    @close="toggleAttendPaidModal"
    @cancel="toggleAttendPaidModal"
    @confirm="onAttendPaidConfirm"
  >
    <template #content>
      <ChallengeAttendConfirm
        :title="'챌린지 참가를 위해서 5,000P가 필요합니다.'"
        :subtit="'유료로 참가 신청하시겠습니까?'"
      />
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ChallengeAttendConfirm from '~/components/publishing/walkking/ChallengeAttendConfirm.vue'
import JoinChallengeModal from '~/components/publishing/walkking/JoinChallengeModal.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import TeamProfileImage from '~/components/publishing/walkking/TeamProfileImage.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import { BottomModal, BaseModal } from '@lemonhc/fo-ui/components/modal'
import BottomToastSlot from '~/components/common/bottomToastSlot.vue'
// 챌린지명
const challengeName = ref('프리썸머 챌린지')
// 참가방식
const challengeType = ref('유료참가')
// 팀명
const teamName = ref('우리는하나')
// 팀소개
const introduceTeam = ref('충남고교 합창단')

const showToast = ref(false) // 토스트 표시 상태
const isShowBottomModal = ref(false) // 챌린지 참가 모달 표시 상태
const buttonAriaLabel = ref('챌린지 참가하기')
const isButtonDisabled = ref(false)

// 유료 참가 버튼 클릭 시
const handleConfirm = async () => {
  await handleAttendPaid()
  isShowBottomModal.value = false
}
// 무료 참가 버튼 클릭 시
const handleCancle = async () => {
  await handleAttendFree()
  isShowBottomModal.value = false
}
// 챌린지 참가하기 버튼 클릭(바텀 모달 호출)
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}
// 챌린지 참가하기 모달 props
const bottomModalProps = ref({
  title: '챌린지 참가하기',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '유료참가',
  cancelButtonText: '무료참가',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

// 무료참가 확인 모달 ref
const isShowAttendFreeModal = ref(false)
// 무료참가 확인 모달 Props
const AttendFreeModalProps = ref({
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '신청',
  cancelButtonText: '아니오',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const handleAttendFree = () => {
  isShowAttendFreeModal.value = true
}
const toggleAttendFreeModal = () => {
  isShowAttendFreeModal.value = !isShowAttendFreeModal.value
}
const onAttendFreeConfirm = () => {
  showToast.value = true
  isShowAttendFreeModal.value = false
  buttonAriaLabel.value = '123번째 참가신청 완료'
  isButtonDisabled.value = true
}

// 유료참가 확인 모달 ref
const isShowAttendPaidModal = ref(false)
// 유료참가 확인 모달 Props
const AttendPaidModalProps = ref({
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '신청',
  cancelButtonText: '아니오',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const handleAttendPaid = () => {
  isShowAttendPaidModal.value = true
}
const toggleAttendPaidModal = () => {
  isShowAttendPaidModal.value = !isShowAttendPaidModal.value
}
const onAttendPaidConfirm = () => {
  showToast.value = true
  isShowAttendPaidModal.value = false
  buttonAriaLabel.value = '123번째 참가신청 완료'
  isButtonDisabled.value = true
}
</script>

<style scoped lang="scss"></style>
