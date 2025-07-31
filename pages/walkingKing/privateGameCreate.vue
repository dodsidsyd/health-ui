<template>
  <BaseBody page-title="걷기게임 만들기" :show-back-button="true">
    <ParticipantTeamChallengeWrap>
      <AddParticipant />
      <ParticipantMyProfile :name="'나'" :src="'walkingking/img-participant-profile.png'" />
      <ParticipantProfile
        v-for="(participant, index) in participants"
        :key="index"
        :name="participant.name"
        :wating="participant.wating"
        :src="participant.src"
      />
    </ParticipantTeamChallengeWrap>

    <FlexSection class="gap-12 pb-40">
      <InputText label="게임명*" :model-value="'여의도 테니스 모임 오세요'" />
      <InputCalendarFromTo label="게임 기간*" />
      <FlexColDiv class="gap-12">
        <InputLabelText label="게임 방식" :required="true" />
        <FlexRowDiv class="gap-28">
          <Radio id="rdo1" v-model="selectedGameMode" name="rdo1" value="reachGoal" aria-label="먼저 목표 도달하기" />
          <Radio id="rdo2" v-model="selectedGameMode" name="rdo1" aria-label="무조건 많이 걷기" />
        </FlexRowDiv>
      </FlexColDiv>
      <InputText v-if="selectedGameMode === 'reachGoal'" unit-l="목표 걸음수" placeholder="10,000" unit-r="걸음" />
      <InputText label="게임결과에 따라" :placeholder="'보상, 벌칙 등 자유롭게 입력해 주세요.'" />
      <FlexColDiv class="gap-6">
        <InputLabelText label="대표이미지" />
        <SelectThumbnail />
      </FlexColDiv>
    </FlexSection>
    <ButtonGroup asymmetric class="is-fixed">
      <Button btn-type="secondary" element-type="button" aria-label="취소" class="lg btn-sticky medium" />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="게임 만들기"
        class="lg btn-sticky medium"
        @click="clickConfirmModal"
      />
    </ButtonGroup>
    <ConfirmModal
      :is-visible="isShowConfirmModal"
      :html="confirmModalContent"
      :is-show-cancel-button="true"
      :is-show-confirm-button="true"
      :is-show-footer="true"
      cancel-button-text="취소"
      confirm-button-text="확인"
      @close="isShowConfirmModal = false"
      @cancel="isShowConfirmModal = false"
      @confirm="handleConfirmBtn"
    />
  </BaseBody>
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import InputCalendarFromTo from '~/components/publishing/input/InputCalendarFromTo.vue'
import ParticipantTeamChallengeWrap from '~/components/publishing/walkking/ParticipantTeamChallengeWrap.vue'
import AddParticipant from '~/components/publishing/walkking/AddParticipant.vue'
import ParticipantMyProfile from '~/components/publishing/walkking/ParticipantMyProfile.vue'
import ParticipantProfile from '~/components/publishing/walkking/ParticipantProfile.vue'
import SelectThumbnail from '~/components/publishing/walkking/SelectThumbnail.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import InputLabelText from '~/components/publishing/input/InputLabelText.vue'
import FlexSection from '~/components/page/FlexSection.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import InputText from '~/components/publishing/input/InputText.vue'
import Radio from '~/components/publishing/input/radio.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
// 먼저 목표도달하기 선택시
const selectedGameMode = ref('reachGoal')
// 참가자 목록 데이터
const participants = [
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' }
]
// 등록확인 Confirm
const isShowConfirmModal = ref(false)
const confirmModalContent = ref('')
const clickConfirmModal = async () => {
  confirmModalContent.value = `
    <div style="font-weight: bold">
     프라이빗 걷기게임을 만드시겠습니까?
    </div>`

  isShowConfirmModal.value = true
}
const handleConfirmBtn = () => {
  navigateTo('/walkingKing/privateGameBeforeStart')
  isShowConfirmModal.value = false
}
</script>
<style scoped lang="scss"></style>
