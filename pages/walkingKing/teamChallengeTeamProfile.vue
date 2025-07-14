<template>
  <BaseBody>
    <div>걷기왕챌린지-팀전 팀프로필 (걷기왕-챌린지-팀프로필)</div>
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
      <!-- 팀 구성원 -->
      <FlexColDiv class="mb-n20">
        <ParticipantTeamChallengeWrap :small-font="true" :wating="false" :title="'팀 구성원'">
          <ParticipantMyProfile :name="'김친구'" :src="'walkingking/img-participant-profile.png'" />
          <ParticipantProfile :name="'김친구'" :src="'walkingking/img-participant-profile.png'" />
          <ParticipantProfile :name="'김친구'" :src="'walkingking/img-participant-profile.png'" />
          <ParticipantProfile :name="'김친구'" :src="'walkingking/img-participant-profile.png'" />
        </ParticipantTeamChallengeWrap>
      </FlexColDiv>
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
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import ChallengeProfileBox from '~/components/publishing/walkking/ChallengeProfileBox.vue'
import ChallengeStepsWrap from '~/components/publishing/walkking/ChallengeStepsWrap.vue'
import ChallengeStepsBox from '~/components/publishing/walkking/ChallengeStepsBox.vue'
import StepsHistoryItem from '~/components/publishing/walkking/StepsHistoryItem.vue'
import ParticipantTeamChallengeWrap from '~/components/publishing/walkking/ParticipantTeamChallengeWrap.vue'
import ParticipantMyProfile from '~/components/publishing/walkking/ParticipantMyProfile.vue'
import ParticipantProfile from '~/components/publishing/walkking/ParticipantProfile.vue'
import ActivityChart from '~/components/publishing/walkking/ActivityChart.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'

const isShowTeamJoinStatusModal = ref(false) // 팀 참가 현황 모달 표시 상태
// 팀 참가 현황 모달 props
const teamJoinStatusModal = ref({
  title: '팀 참가 현황',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
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
</script>

<style scoped lang="scss"></style>
