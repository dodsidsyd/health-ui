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
    <!-- <div>걷기왕 프라이빗 게임 종료 (걷기왕-걷기게임-종료1)</div> -->
    <PrivateGameMainBanner
      :game-title="'내일은 걷기왕 꼴찌 뽑기'"
      :profile-image="'walkingking/img-profile-3.png'"
      :started="true"
      :day="'게임'"
      :label="'종료'"
      :state="'end'"
    >
      <template #badgeSlot>
        <CommonBadge color="purple">무조건많이걷기</CommonBadge>
        <CommonBadge color="orange">최하위가커피쏘기</CommonBadge>
      </template>
      <ParticipantPrivateGameWrap :participants="participants.length">
        <component
          :is="item.type === 'Me' ? PrivateGameRankingBoxMe : ChallengeRankingBox"
          v-for="(item, index) in participants"
          :key="index"
          :rank="item.rank"
          :changed="item.changed"
          :total-num="item.totalNum"
          :changed-rank="item.changedRank"
          :user-name="item.userName"
          :user-location="item.userLocation"
        />
      </ParticipantPrivateGameWrap>
    </PrivateGameMainBanner>

    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="공유하기" class="lg btn-sticky medium w-full" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChallengeRankingBox from '~/components/publishing/walkking/ChallengeRankingBox.vue'
import PrivateGameRankingBoxMe from '~/components/publishing/walkking/PrivateGameRankingBoxMe.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import PrivateGameMainBanner from '~/components/publishing/walkking/PrivateGameMainBanner.vue'
import ParticipantPrivateGameWrap from '~/components/publishing/walkking/ParticipantPrivateGameWrap.vue'

// 참가자 목록 데이터
const participants = ref([
  {
    type: 'challenge',
    rank: '1',
    changed: 'up',
    changedRank: '5',
    totalNum: '5416456',
    userName: '곰탱이',
    userLocation: '서울금천'
  },
  {
    type: 'challenge',
    rank: '2',
    changed: 'down',
    changedRank: '2',
    userName: '곰탱이',
    userLocation: '서울금천'
  },
  {
    type: 'challenge',
    rank: '3',
    changed: 'down',
    changedRank: '2',
    userName: '곰탱이',
    userLocation: '서울금천'
  },
  {
    type: 'Me', // 'PrivateGameRankingBoxMe' 컴포넌트를 위한 type
    rank: '4',
    changed: 'up',
    changedRank: '2',
    userName: '나',
    userLocation: '서울금천'
  },
  {
    type: 'challenge',
    rank: '5',
    changed: 'down',
    changedRank: '2',
    userName: '곰탱이',
    userLocation: '서울금천'
  },
  {
    type: 'challenge',
    rank: '6',
    changed: 'up',
    changedRank: '2',
    userName: '곰탱이',
    userLocation: '서울금천'
  },
  {
    type: 'challenge',
    rank: '7',
    changed: 'up',
    changedRank: '2',
    userName: '곰탱이',
    userLocation: '서울금천'
  }
])
</script>

<style scoped lang="scss"></style>
