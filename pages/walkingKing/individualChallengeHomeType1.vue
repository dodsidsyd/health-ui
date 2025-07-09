<template>
  <BaseBody page-title="걷기왕 챌린지" :show-back-button="true" style="background-color: #fefefe">
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />
    <FlexRowDiv class="mg-22y">
      <Select
        style="width: 8.1rem"
        modal-title="시즌 선택"
        :transparent="true"
        model-value="2025"
        :custom-opts="[
          { value: '2025', label: '2025년' },
          { value: '2024', label: '2024년' }
        ]"
      />
      <Checkbox id="checkBox1" aria-label="종료된 챌린지 보기" :checked="true" class="ml-auto" />
    </FlexRowDiv>
    <div v-if="activeLineTab === 'whole'">
      <BoxedTabs
        :tabs="sectionTabs"
        :active-key="currentSection"
        variant="fill-type"
        @tab-change="handleSectionChange"
      />
      <ChallengeHistoryWrap>
        <ChallengeHistoryItem date="25.07">
          <WalkingChallengeProcessing />
          <WalkingChallenge :have-rank="false" />
        </ChallengeHistoryItem>
        <ChallengeHistoryItem date="25.06">
          <WalkingChallengeOngoing />
          <WalkingChallenge :have-rank="false" />
        </ChallengeHistoryItem>
        <ChallengeHistoryItem date="25.05">
          <WalkingChallengeDisabled :have-rank="false" />
        </ChallengeHistoryItem>
      </ChallengeHistoryWrap>
    </div>
    <div v-else-if="activeLineTab === 'my'">
      <FlexColDiv class="gap-20">
        <WalkingChallengeProcessing />
        <WalkingChallenge :have-rank="false" />
        <WalkingChallengeOngoing />
        <WalkingChallenge :have-rank="false" />
        <WalkingChallengeDisabled :have-rank="false" />
      </FlexColDiv>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BoxedTabs from '~/components/tabbar/BoxedTabs.vue'
import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'
import Select from '~/components/publishing/input/Select.vue'
import Checkbox from '~/components/publishing/input/check.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import WalkingChallenge from '~/components/publishing/commonProfile/WalkingChallenge.vue'
import WalkingChallengeDisabled from '~/components/publishing/walkking/WalkingChallengeDisabled.vue'
import WalkingChallengeProcessing from '~/components/publishing/walkking/WalkingChallengeProcessing.vue'
import WalkingChallengeOngoing from '~/components/publishing/walkking/WalkingChallengeOngoing.vue'
import ChallengeHistoryWrap from '~/components/publishing/walkking/ChallengeHistoryWrap.vue'
import ChallengeHistoryItem from '~/components/publishing/walkking/ChallengeHistoryItem.vue'

// LineTabs 상태 관리
const activeLineTab = ref('whole')

const lineTabs = ref<Tab[]>([
  { title: '전체 챌린지', key: 'whole' },
  { title: 'MY 챌린지', key: 'my' }
])

// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}

// BoxedTabs를 위한 섹션 탭 데이터
const sectionTabs = [
  { title: '전체', key: 'all', count: '12' },
  { title: '접수중', key: 'processing', count: '5' },
  { title: '진행중', key: 'ongoing', count: '5' }
]
const currentSection = ref<string>('all')
const currentFilter = ref<string>('all')
// 섹션 탭 변경 핸들러
const handleSectionChange = (key: string) => {
  currentSection.value = key
  // 섹션이 변경되면 필터를 전체로 리셋
  currentFilter.value = 'all'
}
</script>

<style scoped lang="scss"></style>
