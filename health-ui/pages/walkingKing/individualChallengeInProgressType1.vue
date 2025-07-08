<template>
  <BaseBody
    :has-share="true"
    :has-menu="true"
    page-title="걷기왕 챌린지"
    :show-back-button="true"
    style="background-color: #fefefe"
    :is-transparent="true"
  >
    <RecruitmentindividualChallengeBox />
    <ChallengeProfileBox
      :profile-data="{
        rankUp: true,
        rank: '12',
        name: '장동건',
        location: '서울강남',
        reward: 12,
        currentRank: '138'
      }"
    />
    <FlexRowDiv class="gap-8 mt-18 mb-32">
      <ChallengeStepsBox title="건강걸음" steps="954,298" />
      <ChallengeStepsBox title="플러스걸음" steps="26,300" />
      <ChallengeStepsBox title="총 걸음" steps="980,589" type="total" />
    </FlexRowDiv>
    <RoundTabs :tabs="roundTabs" :active-key="activeRoundTab" @tab-change="onRoundTabChange" />
    <ChallengeRankingBox rank="1" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="2" changed="down" changed-rank="2" />
    <ChallengeRankingBox rank="3" changed="down" changed-rank="2" />
    <ChallengeRankingBoxMe rank="4" changed="up" changed-rank="2" />
    <ChallengeRankingBoxRival rank="5" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="6" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="7" changed="up" changed-rank="2" />
    <EverydayBoosterMission @show-modal="handleShowModal" @hide-modal="handleHideModal" />
  </BaseBody>

  <!-- 아이템 사용하기 모달 -->
  <BottomModal :is-visible="isShowBottomModal" v-bind="bottomModalProps" @close="toggleBottomModal">
    <template #content>
      <UsedBoosterItemSummary :steps="'1234'" :multiply="2" :stacked="'2464'" />
      <UsingItemWrap>
        <BoosterItem
          :src="'walkingking/img-booster-item1.png'"
          :name="'1시간 걸음수 2배'"
          :count="'2'"
          @click="clickAgency"
        />
        <BoosterItem :src="'walkingking/img-booster-item2.png'" :name="'2시간 걸음수 2배'" :count="'1'" />
        <BoosterItem :src="'walkingking/img-booster-item3.png'" :name="'4시간 걸음수 2배'" :count="'3'" />
        <BoosterItem :src="'walkingking/img-booster-item4.png'" :name="'8시간 걸음수 2배'" :count="'3'" />
        <BoosterItem :name="'아이템 구매하기'" />
      </UsingItemWrap>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import RecruitmentindividualChallengeBox from '~/components/publishing/walkking/RecruitmentindividualChallengeBox.vue'
import ChallengeProfileBox from '~/components/publishing/walkking/ChallengeProfileBox.vue'
import ChallengeStepsBox from '~/components/publishing/walkking/ChallengeStepsBox.vue'
import ChallengeRankingBox from '~/components/publishing/walkking/ChallengeRankingBox.vue'
import ChallengeRankingBoxMe from '~/components/publishing/walkking/ChallengeRankingBoxMe.vue'
import ChallengeRankingBoxRival from '~/components/publishing/walkking/ChallengeRankingBoxRival.vue'
import UsedBoosterItemSummary from '~/components/publishing/walkking/UsedBoosterItemSummary.vue'
import UsingItemWrap from '~/components/publishing/walkking/UsingItemWrap.vue'
import BoosterItem from '~/components/publishing/walkking/BoosterItem.vue'
import EverydayBoosterMission from '~/components/publishing/walkking/EverydayBoosterMission.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'
import { BottomModal, AlertModal, ConfirmModal } from '@lemonhc/fo-ui/components/modal'

// RoundTabs 상태 관리
const activeRoundTab = ref('option1')
// RoundTabs 데이터
const roundTabs = ref<RoundTab[]>([
  { title: 'TOP30', key: 'option1' },
  { title: 'MY랭킹', key: 'option2' },
  { title: '친구', key: 'option3' }
])
// RoundTabs 이벤트 핸들러
const onRoundTabChange = (key: string) => {
  activeRoundTab.value = key
  console.log('Round tab 1 changed to:', key)
}

const isShowBottomModal = ref(false)
// 선물받기 모달 props
const bottomModalProps = ref({
  title: '아이템 사용하기',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}
// --- 자식 컴포넌트에서 'show-modal' 이벤트 발생 시 호출될 함수 ---
const handleShowModal = () => {
  isShowBottomModal.value = true // 모달 상태를 열림으로 변경
  console.log('부모: 자식 요청으로 모달 열림')
}

// --- 자식 컴포넌트에서 'hide-modal' 이벤트 발생 시 호출될 함수 ---
const handleHideModal = () => {
  isShowBottomModal.value = true // 모달 상태를 닫힘으로 변경
  console.log('부모: 자식 요청으로 모달 닫힘')
}

const usingItem = async () => {
  await AlertModal.open({
    isVisible: true,
    html: `<div class="flex flex-col align-center gap-32 mb-n10 pt-10">
    <p style="font-size: 1.8rem; font-weight: 500; line-height: 2.5rem;">1시간 걸음수 2배 부스터를<br/>
사용하시겠어요?</p></div>`
  })
}

const clickAgency = async (item: any) => {
  const modalContent = `
    <div>
      <div style="width: 8rem; height: 8rem">
        <img src="/_nuxt/assets/images/walkingking/img-booster-item1.png">
      </div>
      <div>[${item.name}] ${item.label}</div>
      <div>보험설계사용 서비스에 가입하시겠어요?</div>
    </div>`

  const signupModalRes = await ConfirmModal.open({
    isVisible: true,
    html: modalContent,
    confirmButtonText: '사용하기',
    isShowCancelButton: false
  })
  // if (signupModalRes) {
  // }
}
</script>

<style scoped lang="scss"></style>
