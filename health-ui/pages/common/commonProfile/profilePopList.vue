<template>
  <BaseBody :show-back-button="true" page-title="회원 프로필" logo-type="text" :has-setting="true" class="pb-36">
    <div class="flex flex-col gap-12">
      <Button btn-type="primary" element-type="button" aria-label="플로우 " class="xs" @click="clickBottomModal" />
      <Button
        btn-type="primary"
        element-type="button"
        aria-label="프로필 전문가 "
        class="xs"
        @click="clickExpertBottomModal"
      />
    </div>

    <!-- 전문가 모달 -->
    <ProfileBottomModal
      :is-visible="isShowBottomModal"
      v-bind="bottomModalProps"
      @cancel="clickCancel"
      @confirm="clickConfirm"
      @close="toggleBottomModal"
    >
      <template #content>
        <ModalProfile />
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
          <CommunityContentSwiper />
        </div>
      </template>
    </ProfileBottomModal>

    <!--  -->
    <ExpertProfileBottomModal
      :is-visible="isShowExpertBottomModal"
      v-bind="ExpertbottomModalProps"
      @close="toggleExpertBottomModal"
    >
      <template #content>
        <ExpertModalProfile />
        <ExpertIntroduceText class="mt-16" />

        <!-- 방사형 차트 -->
        <ExpertChart class="mt-24" />

        <!-- 전문가 이력 -->
        <ExpertHistory />
      </template>
    </ExpertProfileBottomModal>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import Button from '~/components/publishing/button/Button.vue'

import LineTabs, { type Tab } from '~/components/tabbar/LineTabs.vue'

import ModalProfile from '~/components/publishing/commonProfile/ModalProfile.vue'
import ProfileBottomModal from '~/components/publishing/commonProfile/ProfileBottomModal.vue'

// 전문가 바텀시트
import ExpertModalProfile from '~/components/publishing/commonProfile/ExpertModalProfile.vue'
import ExpertProfileBottomModal from '~/components/publishing/commonProfile/ExpertProfileBottomModal.vue'
import ExpertIntroduceText from '~/components/publishing/commonProfile/ExpertIntroduceText.vue'
import ExpertChart from '~/components/publishing/commonProfile/ExpertChart.vue'
import ExpertHistory from '~/components/publishing/commonProfile/ExpertHistory.vue'

import DayStepsGraph from '~/components/publishing/commonProfile/DayStepsGraph.vue'
import WalkingStatistics from '~/components/publishing/commonProfile/WalkingStatistics.vue'

import ChallengeStatistics from '~/components/publishing/commonProfile/ChallengeStatistics.vue'
import WalkingChallenge from '~/components/publishing/commonProfile/WalkingChallenge.vue'

// 탭별 컴포넌트들
import CommunityStatistics from '~/components/publishing/commonProfile/CommunityStatistics.vue'
import CommunityContentSwiper from '~/components/publishing/commonProfile/CommunityContentSwiper.vue'

// LineTabs 이벤트 핸들러
// LineTabs 상태 관리
const activeLineTab = ref('walk')
const onLineTabChange = (key: string) => {
  activeLineTab.value = key
}
const lineTabs = ref<Tab[]>([
  { title: '걷기', key: 'walk' },
  { title: '걷기왕', key: 'walkking' },
  { title: '커뮤니티', key: 'community' }
])

const isShowBottomModal = ref(false)

const isShowExpertBottomModal = ref(false)

const bottomModalProps = ref({
  title: '',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const ExpertbottomModalProps = ref({
  title: '',
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const toggleExpertBottomModal = () => {
  isShowExpertBottomModal.value = !isShowExpertBottomModal.value
}

const clickBottomModal = () => {
  toggleBottomModal()
}

const clickExpertBottomModal = () => {
  toggleExpertBottomModal()
}
</script>
<style scoped lang="scss">
.expert-history {
  font-size: 1.6rem;
  color: #2b2b2b;
  font-weight: 400;
  line-height: 140%;
  margin-top: 3.2rem;
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 0.2rem 0;
    margin-bottom: 2rem;
  }
  .pre-wrap {
    white-space: pre-wrap;
  }
}
</style>
