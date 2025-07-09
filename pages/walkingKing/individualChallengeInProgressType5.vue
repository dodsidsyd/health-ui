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
      <!-- 친구 게임 배너가 아래 올 때에는 mb-32 > mb-16 -->
      <FlexRowDiv class="gap-8 mt-18 mb-16">
        <ChallengeStepsBox title="건강걸음" steps="954,298" />
        <ChallengeStepsBox title="플러스걸음" steps="26,300" />
        <ChallengeStepsBox title="총 걸음" steps="980,589" type="total" @click="clickStepHistoryModal" />
      </FlexRowDiv>
    </StickyProfileSection>

    <!-- 친구 게임 배너 -->
    <PlayWithFriendsBanner class="mb-16" />

    <!-- TOP30 / MY랭킹 / 친구 탭 -->
    <RoundTabs :tabs="roundTabs" :active-key="activeRoundTab" @tab-change="onRoundTabChange" />
    <!-- 친구 없는 경우 -->
    <HasNoFriends />
    <!-- 매일 부스터 미션 / 부스터 온  -->
    <EverydayBoosterMission @show-modal="handleShowModal" @hide-modal="handleHideModal" />
  </BaseBody>
  <!-- 일일 걸음수 내역 모달 -->
  <BottomModal :is-visible="isShowStepHistoryModal" v-bind="StepHistoryModalProps" @close="toggleStepHistoryModal">
    <template #content>
      <StepsHistoryItem :date="'2025.06.25'" :steps="'8,471'" :mission="'1,600'" :item="'254'" />
      <StepsHistoryItem :date="'2025.06.25'" :steps="'8,471'" :mission="'1,600'" :item="'254'" />
      <StepsHistoryItem :date="'2025.06.25'" :steps="'8,471'" :mission="'1,600'" :item="'254'" />
    </template>
  </BottomModal>
  <!-- 챌린지 미션 모달 -->
  <BottomModal :is-visible="isShowchallengeModal" v-bind="challengeModalProps" @close="toggleChallengeModal">
    <template #content>
      <FlexColDiv class="gap-24">
        <ChallengeBoosterMissionItem
          :subtit="'아침운동 시 부스터UP'"
          :mission="'6~9시 3,000걸음 걷기'"
          :src="'walkingking/img-mission-item1.png'"
          :reward="'받기완료'"
        />
        <ChallengeBoosterMissionItem
          :subtit="'저녁운동 시 부스터UP'"
          :mission="'20~23시 3,000걸음 걷기'"
          :src="'walkingking/img-mission-item2.png'"
          :reward="'+300걸음'"
        />
        <ChallengeBoosterMissionItem
          :subtit="'저녁식사는 간단하게'"
          :mission="'18~21시 저녁식사하기'"
          :src="'walkingking/img-mission-item3.png'"
          :condition="'광고보고'"
          :reward="'+100걸음'"
        />
        <ChallengeBoosterMissionItem
          :subtit="'오늘 하루도 수고했어요.'"
          :mission="'7~9시간 깊은 잠자기'"
          :src="'walkingking/img-mission-item4.png'"
          :reward="'+300걸음'"
          :disabled="true"
        />
        <ChallengeBoosterMissionItem
          :subtit="'매일매일 기록하는'"
          :mission="'걷기왕 커뮤니티 글 등록'"
          :src="'walkingking/img-mission-item5.png'"
          :reward="'+300걸음'"
        />
        <ChallengeBoosterMissionItem
          :subtit="'매일 건강 챙겨요'"
          :mission="'레몬링으로 심박수 측정'"
          :src="'walkingking/img-mission-item6.png'"
          :reward="'+300걸음'"
        />
        <ChallengeBoosterMissionItem
          :subtit="'건강한 수면, 활기찬 하루'"
          :mission="'레몬링으로 수면시간 분석'"
          :src="'walkingking/img-mission-item7.png'"
          :reward="'+300걸음'"
        />
      </FlexColDiv>
    </template>
  </BottomModal>
  <!-- 아이템 사용하기 모달 -->
  <BottomModal :is-visible="isShowItemUseModal" v-bind="ItemUseModalProps" @close="toggleItemUseModal">
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
import ChallengeBoosterMissionItem from '~/components/publishing/walkking/ChallengeBoosterMissionItem.vue'
import UsedBoosterItemSummary from '~/components/publishing/walkking/UsedBoosterItemSummary.vue'
import UsingItemWrap from '~/components/publishing/walkking/UsingItemWrap.vue'
import BoosterItem from '~/components/publishing/walkking/BoosterItem.vue'
import EverydayBoosterMission from '~/components/publishing/walkking/EverydayBoosterMission.vue'
import UsingItemModal from '~/components/publishing/walkking/UsingItemModal.vue'
import StepsHistoryItem from '~/components/publishing/walkking/StepsHistoryItem.vue'
import StickyProfileSection from '~/components/publishing/walkking/StickyProfileSection.vue'
import PlayWithFriendsBanner from '~/components/publishing/walkking/PlayWithFriendsBanner.vue'
import HasNoFriends from '~/components/publishing/walkking/HasNoFriends.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
// RoundTabs 상태 관리
const activeRoundTab = ref('option3')
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
// 챌린지 미션 모달 ref
const isShowchallengeModal = ref(false)
// 챌린지 미션 props
const challengeModalProps = ref({
  title: '챌린지 미션',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 챌린지 미션 모달 토글
const toggleChallengeModal = () => {
  isShowchallengeModal.value = !isShowchallengeModal.value
}
// 아이템 사용하기 모달 ref
const isShowItemUseModal = ref(false)
// 아이템 사용하기 props
const ItemUseModalProps = ref({
  title: '아이템 사용하기',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 아이템 사용하기 모달 토글
const toggleItemUseModal = () => {
  isShowItemUseModal.value = !isShowItemUseModal.value
}
// 일일 걸음수 내역 모달 ref
const isShowStepHistoryModal = ref(false)
// 일일 걸음수 내역 props
const StepHistoryModalProps = ref({
  title: '일일 걸음수 내역',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  disabledCancelButton: false,
  disabledConfirmButton: false,
  confirmButtonText: '닫기'
})
// 일일 걸음수 내역 모달 토글
const toggleStepHistoryModal = () => {
  isShowStepHistoryModal.value = !isShowStepHistoryModal.value
}
const clickStepHistoryModal = () => {
  isShowStepHistoryModal.value = true
}

// --- 자식 컴포넌트에서 'show-modal' 이벤트 발생 시 호출될 함수 ---
const handleShowModal = () => {
  isShowchallengeModal.value = true // 챌린지 미션 모달 열림
}
// --- 자식 컴포넌트에서 'hide-modal' 이벤트 발생 시 호출될 함수 ---
const handleHideModal = () => {
  isShowItemUseModal.value = true // 아이템 사용 모달 열림
}
// 아이템 확인 모달 ref
const isShowUsingItemModal = ref(false)
// 선택된 BoosterItem 데이터를 저장할 ref 추가
const selectedBoosterItem = ref<{ name: string; src: string; count: string } | null>(null)
// 아이템 확인 모달 Props
const UsingItemModalProps = ref({
  isShowCloseButton: false,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '사용하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

// BoosterItem 클릭 시
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
// 아이템 사용 확인 모달 이미지 경로
const IMAGE_BASE_PATH_MODAL = '/_nuxt/assets/images/'
</script>

<style scoped lang="scss"></style>
