<template>
  <BaseBody
    :show-back-button="true"
    page-title="Today 친구랭킹"
    logo-type="text"
    :has-add-text="true"
    :add-text-click-enabled="true"
    :add-text="addTextDisplay"
  >
    <ChallengeRankingBox rank="1" changed="up" changed-rank="1" />
    <ChallengeRankingBox rank="2" changed="down" changed-rank="2" />
    <ChallengeRankingBox rank="3" changed="up" changed-rank="2" />
    <ChallengeRankingBoxMe rank="4" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="5" changed="up" changed-rank="2" />
    <ChallengeRankingBox rank="6" changed="down" changed-rank="2" />
    <ChallengeRankingBox rank="7" changed="up" changed-rank="99" />
    <ChallengeRankingBox rank="8" changed="down" changed-rank="12" />
    <ChallengeRankingBox rank="9" changed="up" changed-rank="12" />

    <InviteFriendBox class="mt-16" />

    <BottomModal
      :is-visible="isShowRankingModal"
      title="랭킹 기준 선택"
      :is-show-cancel-button="true"
      :is-show-confirm-button="true"
      :is-show-close-button="true"
      @close="cancelRankingSelection"
      @cancel="cancelRankingSelection"
      @confirm="confirmRankingSelection"
    >
      <template #content>
        <div class="ranking-options">
          <div
            v-for="option in rankingOptions"
            :key="option.value"
            :class="['option-item', { selected: tempSelectedRanking === option.value }]"
            @click="selectRankingOption(option)"
          >
            <span class="option-label">{{ option.label }}</span>
            <i v-if="tempSelectedRanking === option.value" class="check-icon icon"></i>
          </div>
        </div>
      </template>
    </BottomModal>
  </BaseBody>
</template>

<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import BaseBody from '~/components/layout/BaseBody.vue'
import ChallengeRankingBox from '~/components/publishing/walkking/ChallengeRankingBox.vue'
import ChallengeRankingBoxMe from '~/components/publishing/walkking/ChallengeRankingBoxMe.vue'
import InviteFriendBox from '~/components/publishing/dashboard/InviteFriendBox.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'

interface RankingOption {
  value: string
  label: string
}

// 랭킹 옵션 데이터
const rankingOptions: RankingOption[] = [
  { value: 'steps_daily', label: '걸음수/일' },
  { value: 'steps_total', label: '누적걸음수' }
]

// 상태 관리
const selectedRanking = ref('steps_daily') // 기본값: 걸음수/일
const tempSelectedRanking = ref('steps_daily') // 임시 선택값
const isShowRankingModal = ref(false)

// 현재 선택된 옵션의 라벨을 표시하는 computed
const selectedRankingLabel = computed(() => {
  const selectedOption = rankingOptions.find(option => option.value === selectedRanking.value)
  return selectedOption?.label || '걸음수/일'
})

// addText에 표시할 내용 (스타일 포함 + 화살표 아이콘)
const addTextDisplay = computed(() => {
  return `
    <span style='color:#555;font-size:1.4rem;font-weight:600;display:inline-flex;align-items:center;gap:0.4rem;'>
      ${selectedRankingLabel.value}
      <i class="icon icon-arrow"></i>
    </span>
  `
})

// layout에서 제공하는 addTextClick 핸들러 등록 함수
const setAddTextClickHandler = inject<(handler: () => void) => void>('setAddTextClickHandler')

// BottomModal 관련 함수들
const openRankingOptionModal = () => {
  tempSelectedRanking.value = selectedRanking.value // 모달 열 때 현재 선택값으로 초기화
  isShowRankingModal.value = true
}

const closeRankingModal = () => {
  isShowRankingModal.value = false
}

const selectRankingOption = (option: RankingOption) => {
  tempSelectedRanking.value = option.value
}

// 확인 버튼 클릭 시 실제 선택 적용
const confirmRankingSelection = () => {
  const selectedOption = rankingOptions.find(option => option.value === tempSelectedRanking.value)
  if (selectedOption) {
    selectedRanking.value = tempSelectedRanking.value
  }
  closeRankingModal()
}

// 취소 버튼 클릭 시 임시 선택값 리셋
const cancelRankingSelection = () => {
  tempSelectedRanking.value = selectedRanking.value
  closeRankingModal()
}

// 컴포넌트 마운트 시 addTextClick 핸들러 등록
onMounted(() => {
  if (setAddTextClickHandler) {
    setAddTextClickHandler(openRankingOptionModal)
  }
})
</script>

<style lang="scss" scoped>
.ranking-options {
  margin-left: -2rem;
  margin-right: -2rem;

  .option-item {
    display: flex;
    position: relative;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1.6rem 2rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &.selected {
      background-color: #f6f9ff;

      .option-label {
        color: #4c7ff7;
        font-weight: 700;
      }
    }

    .option-label {
      flex: 1;
      font-size: 1.6rem;
      font-weight: 500;
      color: #555555;
      text-align: left;
    }

    .check-icon {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      right: 2rem;
      top: 50%;
      margin-top: -1.2rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M20 6L9 17L4 12' stroke='%234C7FF7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  }
}
</style>
