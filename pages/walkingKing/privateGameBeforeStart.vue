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
    <!-- <div>걷기왕 프라이빗 게임 시작전(걷기왕-걷기게임-시작전)</div> -->
    <PrivateGameMainBanner :game-title="'이멤버 리벰버 최고는 누구?'" :profile-image="'walkingking/img-profile-1.png'">
      <template #badgeSlot>
        <CommonBadge color="blue">먼저목표도달하기</CommonBadge>
        <CommonBadge color="yellow">200,000걸음</CommonBadge>
        <CommonBadge color="orange">최하위가커피쏘기</CommonBadge>
      </template>
      <ParticipantTeamChallengeWrap>
        <AddParticipant @invite-friends="inviteFriends" />
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

    <ButtonGroup class="is-fixed">
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="시작하기"
        class="lg btn-sticky medium w-full"
        disabled
      />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import ParticipantTeamChallengeWrap from '~/components/publishing/walkking/ParticipantTeamChallengeWrap.vue'
import AddParticipant from '~/components/publishing/walkking/AddParticipant.vue'
import ParticipantMyProfile from '~/components/publishing/walkking/ParticipantMyProfile.vue'
import ParticipantProfile from '~/components/publishing/walkking/ParticipantProfile.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import PrivateGameMainBanner from '~/components/publishing/walkking/PrivateGameMainBanner.vue'

// 참가자 목록 데이터
const participants = [
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' }
]
const inviteFriends = () => {
  navigateTo('/walkingKing/teamChallengeInviteFriends')
}
</script>

<style scoped lang="scss"></style>
