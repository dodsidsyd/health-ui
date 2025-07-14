<template>
  <BaseBody>
    <div>걷기왕챌린지-팀전 참가자프로필 (걷기왕-챌린지-참가자프로필)</div>
  </BaseBody>
  <BottomModal :is-visible="isShowTeamJoinStatusModal" v-bind="teamJoinStatusModal" @close="toggleTeamJoinStatusModal">
    <template #content>
      <!-- 프로필 -->
      <FlexColDiv class="mt-n32">
        <ChallengeProfileBox
          :profile-data="{
            rankUp: true,
            rank: '12',
            name: '장동건',
            location: '서울강남',
            reward: 12,
            currentRank: '138'
          }"
        />
      </FlexColDiv>
      <!-- 프로필 하단 걸음 수 박스 -->
      <FlexRowDiv class="gap-8 mt-18 mb-32">
        <ChallengeStepsBox title="건강걸음" steps="954,298" />
        <ChallengeStepsBox title="플러스걸음" steps="26,300" />
        <ChallengeStepsBox title="총 걸음" steps="980,589" type="total" @click="clickStepHistoryModal" />
      </FlexRowDiv>
      <!-- 날짜 별 걸음수 현황판 -->
      <ActivityChart />
      <!-- 걷기 통계 -->
      <ChallengeStepsWrap>
        <ChallengeStepsBox title="건강걸음/오늘" steps="954,298" />
        <ChallengeStepsBox title="플러스걸음/오늘" steps="954,298" />
        <ChallengeStepsBox title="총 걸음/오늘" steps="954,298" />
        <ChallengeStepsBox title="건강걸음/일평균" steps="954,298" />
        <ChallengeStepsBox title="플러스걸음/일평균" steps="954,298" />
        <ChallengeStepsBox title="총 걸음/일평균" steps="954,298" />
      </ChallengeStepsWrap>
      <ButtonGroup v-if="canSetRival" gap="8">
        <Button
          v-if="!hasRival"
          btn-type="secondary"
          element-type="button"
          aria-label="경쟁자 지정"
          class="btn-darkgray"
          @click="clickSetRivalModal"
        />
        <Button
          v-else
          btn-type="secondary"
          element-type="button"
          aria-label="경쟁자 해제"
          @click="clickClearRivalModal"
        />
        <Button btn-type="primary" element-type="button" aria-label="메시지 보내기" />
      </ButtonGroup>
      <ButtonGroup v-else gap="8">
        <Button btn-type="primary" element-type="button" aria-label="메시지 보내기" class="w-full" />
      </ButtonGroup>
    </template>
  </BottomModal>
  <!-- 일일 걸음수 내역 모달 -->
  <BottomModal :is-visible="isShowStepHistoryModal" v-bind="StepHistoryModalProps" @close="toggleStepHistoryModal">
    <template #content>
      <StepsHistoryItem :date="'2025.06.25'" :steps="'8,471'" :mission="'1,600'" :item="'254'" />
      <StepsHistoryItem :date="'2025.06.25'" :steps="'8,471'" :mission="'1,600'" :item="'254'" />
      <StepsHistoryItem :date="'2025.06.25'" :steps="'8,471'" :mission="'1,600'" :item="'254'" />
    </template>
  </BottomModal>
  <!-- 경쟁자 지정 모달 -->
  <BaseModal
    :is-visible="isShowSetRivalModal"
    v-bind="SetRivalModalProps"
    @close="toggleSetRivalModal"
    @cancel="toggleSetRivalModal"
    @confirm="confirmedSetRival"
  >
    <template #content>{%회원닉네임%}님을 경쟁자로 지정하시겠습니까?</template>
  </BaseModal>
  <!-- 경쟁자 해제 모달 -->
  <BaseModal
    :is-visible="isShowClearRivalModal"
    v-bind="ClearRivalModalProps"
    @close="toggleClearRivalModal"
    @cancel="toggleClearRivalModal"
    @confirm="confirmedClearRival"
  >
    <template #content>{%회원닉네임%}님을 경쟁자지정 해제하시겠습니까?</template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import Button from '~/components/publishing/button/Button.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import ChallengeProfileBox from '~/components/publishing/walkking/ChallengeProfileBox.vue'
import ChallengeStepsWrap from '~/components/publishing/walkking/ChallengeStepsWrap.vue'
import ChallengeStepsBox from '~/components/publishing/walkking/ChallengeStepsBox.vue'
import StepsHistoryItem from '~/components/publishing/walkking/StepsHistoryItem.vue'
import ActivityChart from '~/components/publishing/walkking/ActivityChart.vue'
import { BaseModal, BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowTeamJoinStatusModal = ref(false) // 팀 참가 현황 모달 표시 상태
// 팀 참가 현황 모달 props
const teamJoinStatusModal = ref({
  title: '참가 현황',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 팀 참가 현황 모달 버튼 클릭(바텀 모달 호출)
const toggleTeamJoinStatusModal = () => {
  isShowTeamJoinStatusModal.value = !isShowTeamJoinStatusModal.value
}
// 마운트 시 모달 호출
onMounted(() => {
  isShowTeamJoinStatusModal.value = true
})
// 일일 걸음수 내역 모달 ref
const isShowStepHistoryModal = ref(false)
// 일일 걸음수 내역 props
const StepHistoryModalProps = ref({
  title: '일일 걸음수 내역',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  disabledCancelButton: false,
  disabledConfirmButton: false,
  confirmButtonText: '닫기'
})
// 일일 걸음수 내역 모달 토글
const toggleStepHistoryModal = () => {
  isShowStepHistoryModal.value = !isShowStepHistoryModal.value
}
// 총 걸음 클릭시
const clickStepHistoryModal = () => {
  isShowStepHistoryModal.value = true
}
// 경쟁자 지정 가불
const canSetRival = ref(true)
// 경쟁자 지정 모달 ref
const isShowSetRivalModal = ref(false)
// 경쟁자 지정 모달 Props
const SetRivalModalProps = ref({
  isShowCloseButton: false,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 경쟁자 지정 버튼 클릭 시
const clickSetRivalModal = () => {
  isShowSetRivalModal.value = true
}
// 경쟁자 지정 상태 토글
const toggleSetRivalModal = () => {
  isShowSetRivalModal.value = !isShowSetRivalModal.value
}
// 경쟁자 설정 여부
const hasRival = ref(false)
const confirmedSetRival = () => {
  isShowSetRivalModal.value = false
  hasRival.value = true
}
const confirmedClearRival = () => {
  isShowClearRivalModal.value = false
  hasRival.value = false
}
// 경쟁자 지정 모달 ref
const isShowClearRivalModal = ref(false)
// 경쟁자 지정 모달 Props
const ClearRivalModalProps = ref({
  isShowCloseButton: false,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 경쟁자 지정 버튼 클릭 시
const clickClearRivalModal = () => {
  isShowClearRivalModal.value = true
}
// 경쟁자 지정 상태 토글
const toggleClearRivalModal = () => {
  isShowClearRivalModal.value = !isShowClearRivalModal.value
}
</script>

<style scoped lang="scss"></style>
