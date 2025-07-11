<template>
  <BaseBody
    :has-share="true"
    page-title="걷기왕 챌린지"
    :show-back-button="true"
    style="background-color: #fefefe"
    :is-transparent="true"
    :has-add-text="true"
    :add-text-click-enabled="true"
    add-text="<span class='icon ico-menu'>메뉴 아이콘</span>"
  >
    <!-- 메인 배너 -->
    <RecruitmentindividualChallengeBox :end="true" />
    <!-- 챌린지 종료·순위 박스 -->
    <ChallengeResultWrap>
      <ChallengeResultBox :rank="'2'" />
      <ChallengeResultBox :rank="'1'" />
      <ChallengeResultBox :rank="'3'" />
    </ChallengeResultWrap>
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
        <ChallengeStepsBox title="총 걸음" steps="980,589" type="total" @click="clickStepHistoryModal" />
      </FlexRowDiv>
    </StickyProfileSection>
    <!-- TOP30 / MY랭킹 / 친구 탭 -->
    <RoundTabs :tabs="roundTabs" :active-key="activeRoundTab" @tab-change="onRoundTabChange" />
    <ChallengeRankingBox rank="1" changed="up" changed-rank="2" user-name="곰탱이" user-location="서울금천" />
    <ChallengeRankingBox rank="2" changed="down" changed-rank="2" user-name="곰탱이" user-location="서울금천" />
    <ChallengeRankingBox rank="3" changed="down" changed-rank="2" user-name="곰탱이" user-location="서울금천" />
    <ChallengeRankingBoxMe rank="4" changed="up" changed-rank="2" />
    <ChallengeRankingBoxRival rank="5" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="6" changed="up" changed-rank="2" user-name="곰탱이" user-location="서울금천" />
    <ChallengeRankingBox rank="7" changed="up" changed-rank="2" user-name="곰탱이" user-location="서울금천" />
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
  <BaseModal
    :is-visible="isShowUsingItemModal"
    v-bind="UsingItemModalProps"
    @close="toggleUsingItemModal"
    @cancel="toggleUsingItemModal"
  >
    <template #content>
      <UsingItemConfirm />
    </template>
  </BaseModal>
  <!-- 챌린지 메뉴 모달 -->
  <BottomModal
    :is-visible="isShowChallengeMenuModal"
    v-bind="ChallengeMenuModalProps"
    @close="toggleChallengeMenuModal"
  >
    <template #content>
      <ul>
        <li>
          <NuxtLink to="#"><p class="pd-19y fz-16 text-left">응원하기</p></NuxtLink>
        </li>
        <li>
          <NuxtLink to="#"><p class="pd-19y fz-16 text-left">참가 취소하기</p> </NuxtLink>
        </li>
        <li v-if="challengeProgressing">
          <NuxtLink to="#"><p class="pd-19y fz-16 text-left">챌린지 상세보기</p> </NuxtLink>
        </li>
      </ul>
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
import ChallengeBoosterMissionItem from '~/components/publishing/walkking/ChallengeBoosterMissionItem.vue'
import UsedBoosterItemSummary from '~/components/publishing/walkking/UsedBoosterItemSummary.vue'
import UsingItemWrap from '~/components/publishing/walkking/UsingItemWrap.vue'
import BoosterItem from '~/components/publishing/walkking/BoosterItem.vue'
import EverydayBoosterMission from '~/components/publishing/walkking/EverydayBoosterMission.vue'
import UsingItemConfirm from '~/components/publishing/walkking/UsingItemConfirm.vue'
import StepsHistoryItem from '~/components/publishing/walkking/StepsHistoryItem.vue'
import StickyProfileSection from '~/components/publishing/walkking/StickyProfileSection.vue'
import ChallengeResultWrap from '~/components/publishing/walkking/ChallengeResultWrap.vue'
import ChallengeResultBox from '~/components/publishing/walkking/ChallengeResultBox.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'
import { BottomModal, BaseModal } from '@lemonhc/fo-ui/components/modal'
// 레이아웃에서 addTextClick 핸들러 등록 기능 가져오기
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')
// 컴포넌트 마운트 시 addTextClick 핸들러 등록
onMounted(() => {
  if (setAddTextClickHandler) {
    setAddTextClickHandler(clickChallengeMenuModal)
  }
})

// RoundTabs 상태 관리
const activeRoundTab = ref('option2')
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
// 챌린지 진행 중 상태
const challengeProgressing = false
// 챌린지 메뉴 ref
const isShowChallengeMenuModal = ref(false)
// 챌린지 메뉴 props
const ChallengeMenuModalProps = ref({
  title: '챌린지 메뉴',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: false,
  disabledCancelButton: false,
  disabledConfirmButton: false
})
// 챌린지 메뉴 모달 토글
const toggleChallengeMenuModal = () => {
  isShowChallengeMenuModal.value = !isShowChallengeMenuModal.value
}
// 챌린지 메뉴 클릭
const clickChallengeMenuModal = () => {
  isShowChallengeMenuModal.value = true
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

// 아이템 확인 모달 Props
const UsingItemModalProps = ref({
  isShowCloseButton: false,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '사용하기',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

// BoosterItem 클릭 시
const clickUsingItemModal = () => {
  isShowUsingItemModal.value = true
}
const toggleUsingItemModal = () => {
  isShowUsingItemModal.value = !isShowUsingItemModal.value
}
</script>

<style scoped lang="scss"></style>
