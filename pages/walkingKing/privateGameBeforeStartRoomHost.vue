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
    <!-- <div>걷기왕 프라이빗 게임 시작전(방장) [걷기왕-걷기게임-시작전(초대완료시-방장화면)]</div> -->
    <PrivateGameMainBanner :game-title="'내일은 걷기왕 꼴찌 뽑기'" :profile-image="'walkingking/img-profile-2.png'">
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

    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="시작하기" class="lg btn-sticky medium w-full" />
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
  { name: '김친구', wating: false, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: false, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' },
  { name: '김친구', wating: true, src: 'walkingking/img-participant-profile.png' }
]
</script>

<style scoped lang="scss"></style>
