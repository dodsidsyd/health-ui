<template>
  <BaseBody :show-back-button="true" page-title="회원 프로필" logo-type="text" :has-setting="true" class="pb-36">
    <ProfileBox
      :profile-data="{
        name: '장동건',
        location: '서울 금천',
        reward: 12
      }"
    />
    <Followers class="mt-16" />
    <hr class="hr-section mb-10 ml-n20 mr-n20" />
    <LineTabs :tabs="lineTabs" :active-key="activeLineTab" @tab-change="onLineTabChange" />

    <!-- 걷기 탭 컨텐츠 -->
    <div v-if="activeLineTab === 'walk'">
      <DayStepsGraph class="mt-24" />
      <WalkingStatistics class="mt-24" />
    </div>

    <!-- 걷기왕 탭 컨텐츠 -->
    <div v-else-if="activeLineTab === 'walkking'">
      <ChallengeStatistics class="mt-24" />
      <WalkingChallenge class="mt-24" />
    </div>

    <!-- 커뮤니티 탭 컨텐츠 -->
    <div v-else-if="activeLineTab === 'community'">
      <CommunityStatistics class="mt-24" />
      <CommunityContent />
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'

import ProfileBox from '~/components/publishing/commonProfile/ProfileBox.vue'
import Followers from '~/components/publishing/commonProfile/Followers.vue'

import DayStepsGraph from '~/components/publishing/commonProfile/DayStepsGraph.vue'
import WalkingStatistics from '~/components/publishing/commonProfile/WalkingStatistics.vue'

import ChallengeStatistics from '~/components/publishing/commonProfile/ChallengeStatistics.vue'
import WalkingChallenge from '~/components/publishing/commonProfile/WalkingChallenge.vue'

// 탭별 컴포넌트들
import CommunityStatistics from '~/components/publishing/commonProfile/CommunityStatistics.vue'
import CommunityContent from '~/components/publishing/commonProfile/CommunityContent.vue'

import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

// LineTabs 상태 관리
const activeLineTab = ref('walk')

const lineTabs = ref<Tab[]>([
  { title: '걷기', key: 'walk' },
  { title: '걷기왕', key: 'walkking' },
  { title: '커뮤니티', key: 'community' }
])

// LineTabs 이벤트 핸들러
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}
</script>
<style scoped lang="scss"></style>
