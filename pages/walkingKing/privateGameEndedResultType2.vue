<template>
  <BaseBody
    :has-share="true"
    page-title="프라이빗 게임 결과"
    :is-transparent="true"
    :show-back-button="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-menu'>메뉴 아이콘</span>"
  >
    <!--  <div>걷기왕 프라이빗 게임 종료 [걷기왕-걷기게임-종료(무조건많이걷기)]</div> -->
    <PrivateGameResultTitle
      :title="'내일은 걷기왕 꼴찌 뽑기'"
      :date="'2025. 06. 15 ~ 2025. 06. 30'"
      :goal="'200,000'"
      :forfeit="'주말 영화쏘기'"
      :has-goal="false"
    />
    <ChallengeResultWrap>
      <ChallengeResultBox :rank="'2'" />
      <ChallengeResultBox :rank="'1'" />
      <ChallengeResultBox :rank="'3'" />
    </ChallengeResultWrap>

    <FlexColDiv class="ml-n8">
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
    </FlexColDiv>
    <ButtonGroup class="is-fixed">
      <Button btn-type="primary" element-type="button" aria-label="공유하기" class="lg btn-sticky medium w-full" />
    </ButtonGroup>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChallengeResultWrap from '~/components/publishing/walkking/ChallengeResultWrap.vue'
import ChallengeResultBox from '~/components/publishing/walkking/ChallengeResultBox.vue'
import Button from '~/components/publishing/button/Button.vue'
import ButtonGroup from '~/components/publishing/button/ButtonGroup.vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import ChallengeRankingBox from '~/components/publishing/walkking/ChallengeRankingBox.vue'
import PrivateGameRankingBoxMe from '~/components/publishing/walkking/PrivateGameRankingBoxMe.vue'
import PrivateGameResultTitle from '~/components/publishing/walkking/PrivateGameResultTitle.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
// 참가자 목록 데이터
const participants = ref([
  {
    type: 'Me',
    rank: '4',
    changed: 'up',
    totalNum: '564564',
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
  },
  {
    type: 'challenge',
    rank: '8',
    changed: 'up',
    changedRank: '2',
    userName: '곰탱이',
    userLocation: '서울금천'
  }
])
</script>

<style scoped lang="scss"></style>
