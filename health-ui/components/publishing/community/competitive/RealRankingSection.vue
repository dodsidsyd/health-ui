<template>
  <div class="real-ranking-section">
    <TitleBox
      class="mt-32"
      title="실시간 랭킹"
      aria-label="전체랭킹"
      element-type="a"
      :is-show-link="true"
      link-class="btn-link"
      :is-link="true"
      link-href="#"
    />
    <StickyTabsContainer>
      <BoxedTabs
        :tabs="boxTabsA"
        :active-key="activeBoxTabA"
        variant="fill-type"
        @tab-change="onBoxTabChangeA"
        class="mb-20"
      />
    </StickyTabsContainer>
    <div>
      <ChallengeRankingBox
        v-for="(user, index) in rankingList"
        :key="index"
        :rank="user.rank"
        :is-show-change="user.isShowChange"
        :is-show-steps="user.isShowSteps"
        :user-name="user.userName"
        :user-location="user.userLocation"
        :total-num="user.totalNumb"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TitleBox from '~/components/common/TitleBox.vue'
import StickyTabsContainer from '~/components/common/StickyTabsContainer.vue'
import BoxedTabs, { type BoxTab } from '~/components/tabbar/BoxedTabs.vue'
import ChallengeRankingBox from '~/components/publishing/walkking/ChallengeRankingBox.vue'

const boxTabsA = ref<BoxTab[]>([
  { title: '스트레스점수', key: 'option0' },
  { title: '수면점수', key: 'option1' },
  { title: '칼로리소모량', key: 'option2' }
])
const activeBoxTabA = ref('option0')

const onBoxTabChangeA = (key: string) => {
  activeBoxTabA.value = key
  console.log('A 탭 선택됨:', key)
}

const rankingList = [
  {
    rank: '1',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    userLocation: 'lv.10',
    totalNumb: '980'
  },
  {
    rank: '2',
    isShowChange: false,
    isShowSteps: false,
    userName: '유교맨',
    userLocation: 'lv.10',
    totalNumb: '970'
  },
  {
    rank: '3',
    isShowChange: false,
    isShowSteps: false,
    userName: '곰탱이',
    userLocation: 'lv.10',
    totalNumb: '960'
  },
  {
    rank: '4',
    isShowChange: false,
    isShowSteps: false,
    userName: '유교맨',
    userLocation: 'lv.10',
    totalNumb: '950'
  }
]
</script>
<style scoped lang="scss">
.ranking-wrap {
  &:last-child {
    border-bottom: 0;
  }
}
</style>
