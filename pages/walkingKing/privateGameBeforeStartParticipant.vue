<template>
  <BaseBody
    :white-logo="true"
    :has-share="true"
    page-title="프라이빗 게임"
    :is-transparent="true"
    :show-back-button="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-menu'>메뉴 아이콘</span>"
  >
    <!-- 걷기왕 프라이빗 게임 시작전(참여자) [걷기왕-걷기게임-시작전(초대랜딩-참여자)] -->
    <PrivateGameMainBanner :game-title="'테니스 동호회 걷기 최강자!'" :profile-image="'walkingking/img-profile-3.png'">
      <template #badgeSlot>
        <CommonBadge color="purple">무조건많이걷기</CommonBadge>
        <CommonBadge color="orange">최하위가커피쏘기</CommonBadge>
      </template>
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
    </PrivateGameMainBanner>

    <ButtonGroup asymmetric class="is-fixed">
      <Button
        btn-type="secondary"
        element-type="button"
        aria-label="거절하기"
        class="lg btn-sticky"
        @click="clickRefuse"
      />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="참여하기"
        class="lg btn-sticky medium w-full"
        @click="clickParticipate"
      />
    </ButtonGroup>

    <ConfirmModal
      :is-visible="isShowParticipateModal"
      :html="ParticipateModalContent"
      :is-show-cancel-button="true"
      :is-show-confirm-button="true"
      :is-show-footer="true"
      cancel-button-text="취소"
      confirm-button-text="확인"
      @close="isShowParticipateModal = false"
      @cancel="isShowParticipateModal = false"
      @confirm="handleParticipateBtn"
    />
    <ConfirmModal
      :is-visible="isShowRefuseModal"
      :html="RefuseModalContent"
      :is-show-cancel-button="true"
      :is-show-confirm-button="true"
      :is-show-footer="true"
      cancel-button-text="취소"
      confirm-button-text="확인"
      @close="isShowRefuseModal = false"
      @cancel="isShowRefuseModal = false"
      @confirm="handleRefuseBtn"
    />
    <BottomToastSlot v-model="showToast1" type="success" :duration="3000">
      <p>프라이빗 게임 참가가 수락되었습니다.</p></BottomToastSlot
    >
    <BottomToastSlot v-model="showToast2" type="success" :duration="3000">
      <p>프라이빗 게임 참가가 거절되었습니다.</p></BottomToastSlot
    >
  </BaseBody>
</template>

<script setup lang="ts">
import BottomToastSlot from '~/components/common/bottomToastSlot.vue'
import ParticipantTeamChallengeWrap from '~/components/publishing/walkking/ParticipantTeamChallengeWrap.vue'
import AddParticipant from '~/components/publishing/walkking/AddParticipant.vue'
import ParticipantMyProfile from '~/components/publishing/walkking/ParticipantMyProfile.vue'
import ParticipantProfile from '~/components/publishing/walkking/ParticipantProfile.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import PrivateGameMainBanner from '~/components/publishing/walkking/PrivateGameMainBanner.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'
// 토스트 표시 상태
const showToast1 = ref(false)
const showToast2 = ref(false)
// 참가자 목록 데이터
const participants = [
  { name: '김친구', wating: false, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: false, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' }
]

// 참가 수락
const isShowParticipateModal = ref(false)
const ParticipateModalContent = ref('')
const clickParticipate = async () => {
  ParticipateModalContent.value = `
    <div style="font-weight: bold">
    프라이빗 걷기게임 초대를 수락하시겠습니까?
    </div>`

  isShowParticipateModal.value = true
}
const handleParticipateBtn = () => {
  showToast1.value = true
  setTimeout(() => {
    showToast1.value = false
    navigateTo('/walkingKing/privateGameInProgress')
  }, 1000)
  isShowParticipateModal.value = false
}
// 참가 거절
const isShowRefuseModal = ref(false)
const RefuseModalContent = ref('')
const clickRefuse = async () => {
  RefuseModalContent.value = `
    <div style="font-weight: bold">
    프라이빗 걷기게임 초대를 거절하시겠습니까?
    </div>`

  isShowRefuseModal.value = true
}
const handleRefuseBtn = () => {
  showToast2.value = true
  setTimeout(() => {
    showToast2.value = false
    navigateTo('/common/home')
  }, 1000)
  isShowParticipateModal.value = false
}
</script>

<style scoped lang="scss"></style>
