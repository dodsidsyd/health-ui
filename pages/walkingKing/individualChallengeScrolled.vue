<template>
  <BaseBody
    :has-share="true"
    :has-menu="true"
    page-title="걷기왕 챌린지"
    :show-back-button="true"
    style="background-color: #fefefe"
    :is-transparent="true"
  >
    <!-- 메인 배너 -->
    <RecruitmentindividualChallengeBox />
    <!-- 헤더 고정 영역 -->
    <StickyProfileSection>
      <!-- 프로필 -->
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
      <!-- 프로필 하단 걸음 수 박스 -->
      <FlexRowDiv class="gap-8 mt-18 mb-32">
        <ChallengeStepsBox title="건강걸음" steps="954,298" />
        <ChallengeStepsBox title="플러스걸음" steps="26,300" />
        <ChallengeStepsBox title="총 걸음" steps="980,589" type="total" />
      </FlexRowDiv>
    </StickyProfileSection>
    <!-- TOP30 / MY랭킹 / 친구 탭 -->
    <RoundTabs :tabs="roundTabs" :active-key="activeRoundTab" @tab-change="onRoundTabChange" />
    <ChallengeRankingBox rank="1" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="2" changed="down" changed-rank="2" />
    <ChallengeRankingBox rank="3" changed="down" changed-rank="2" />
    <ChallengeRankingBoxMe rank="4" changed="up" changed-rank="2" />
    <ChallengeRankingBoxRival rank="5" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="6" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="7" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="8" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="9" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="10" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="11" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="12" changed="up" changed-rank="2" />
    <!-- 매일 부스터 미션 / 부스터 온  -->
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
          @item-clicked="clickUsingItemModal"
        />
        <BoosterItem :src="'walkingking/img-booster-item2.png'" :name="'2시간 걸음수 2배'" :count="'1'" />
        <BoosterItem :src="'walkingking/img-booster-item3.png'" :name="'4시간 걸음수 2배'" :count="'3'" />
        <BoosterItem :src="'walkingking/img-booster-item4.png'" :name="'8시간 걸음수 2배'" :count="'3'" />
        <BoosterItem :name="'아이템 구매하기'" />
      </UsingItemWrap>
    </template>
  </BottomModal>
  <!-- 아이템 사용 확인 모달 -->
  <UsingItemModal :is-visible="isShowUsingItemModal" v-bind="UsingItemModalProps" @close="toggleUsingItemModal">
    <template #content>
      <div v-if="selectedBoosterItem" class="flex flex-col align-center gap-32 mb-n12">
        <div style="width: 8rem; height: 8rem">
          <img :src="`${IMAGE_BASE_PATH_MODAL}${selectedBoosterItem.src}`" alt="선택된 아이템 이미지" />
        </div>
        <p style="font-size: 1.8rem; font-weight: 500">{{ selectedBoosterItem.name }} 부스터를<br />사용하시겠어요?</p>
      </div>
    </template>
  </UsingItemModal>
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
import UsingItemModal from '~/components/publishing/walkking/UsingItemModal.vue'
import StickyProfileSection from '~/components/publishing/walkking/StickyProfileSection.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
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
}

const isShowBottomModal = ref(false)
// 선물받기 모달 props
const bottomModalProps = ref({
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
}

// --- 자식 컴포넌트에서 'hide-modal' 이벤트 발생 시 호출될 함수 ---
const handleHideModal = () => {
  isShowBottomModal.value = true // 모달 상태를 닫힘으로 변경
}

const isShowUsingItemModal = ref(false)
// 선택된 BoosterItem 데이터를 저장할 ref 추가
const selectedBoosterItem = ref<{ name: string; src: string; count: string } | null>(null)

const UsingItemModalProps = ref({
  isShowCloseButton: false,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '사용하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

// BoosterItem 클릭 시 호출될 새로운 핸들러
const clickUsingItemModal = (itemData: { name: string; src: string; count: string }) => {
  selectedBoosterItem.value = itemData
  isShowUsingItemModal.value = true // UsingItemModal 열기
}

const toggleUsingItemModal = () => {
  isShowUsingItemModal.value = !isShowUsingItemModal.value
  if (!isShowUsingItemModal.value) {
    selectedBoosterItem.value = null
  }
}

const IMAGE_BASE_PATH_MODAL = '/_nuxt/assets/images/'
</script>

<style scoped lang="scss"></style>
