<template>
  <BaseBody page-title="걷기왕" :is-transparent="true" :has-reward="true" white-logo="true">
    <MainProfile />
    <MainChallengeBanner class="mt-40" />
    <RoundTabs :tabs="roundTabs" :active-index="roundActiveIndex" @tab-click="handleRoundTabClick" />
    <MainChallengeList class="mt-12" />
    <hr class="hr-section ml-n20 mr-n20 mb-10" />
    <MainPrivateGameBanner class="mt-22" />
    <MainPrivateGameCard class="mt-12 mb-48" />

    <WalkingKingInfoModal />
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import MainProfile from '~/components/publishing/walkking/subMain/MainProfile.vue'

import MainChallengeBanner from '~/components/publishing/walkking/subMain/MainChallengeBanner.vue'
import MainPrivateGameBanner from '~/components/publishing/walkking/subMain/MainPrivateGameBanner.vue'
import MainPrivateGameCard from '~/components/publishing/walkking/subMain/MainPrivateGameCard.vue'
import MainChallengeList from '~/components/publishing/walkking/subMain/MainChallengeList.vue'

import WalkingKingInfoModal from '~/components/publishing/walkking/subMain/WalkingKingInfoModal.vue'

import RoundTabs, { type RoundTab } from '~/components/common/tab/RoundTabs.vue'

// RoundTabs 데이터
const roundTabs: RoundTab[] = [
  { name: '접수중', code: '' },
  { name: '진행중', code: '' }
]
const roundActiveIndex = ref(0)
const handleRoundTabClick = (index: number) => {
  roundActiveIndex.value = index
}
</script>

<style scoped lang="scss"></style>
