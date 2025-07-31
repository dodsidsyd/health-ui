<template>
  <section class="current-mood-section">
    <TitleBox title="요즘 나는?" class="mb-0" />
    <AiBox :type="diaryStatus" :title="diaryInfo.title" :text="diaryInfo.text" />
    <FlexColDiv>
      <FlexRowDiv class="align-center mt-12 mb-8">
        <Select
          v-model="selectedPeriod"
          :custom-opts="periodOptions"
          select-placeholder=""
          modal-title="조회 기간 선택"
          :is-show-cancel-btn="false"
        />
        <p>동안의 기록이에요</p>
      </FlexRowDiv>
      <FlexRowDiv class="gap-12">
        <RecordCountCard
          v-for="record in recordCards"
          :key="record.id"
          :title="record.title"
          :record-count="record.recordCount"
          :is-emoji="record.isEmoji"
          :emoji-Class="record.emojiClass"
          :is-num="record.isNum"
        />
      </FlexRowDiv>
      <RecordDiaryCard diary-title="지난달엔 어땠을까?" diary-date="2024.03.18" :diary-text="diaryText" class="mt-12" />
    </FlexColDiv>
  </section>
</template>
<script setup lang="ts">
import TitleBox from '~/components/common/TitleBox.vue'
import AiBox from './AiBox.vue'
import FlexRowDiv from '~/components/page/FlexRowDiv.vue'
import FlexColDiv from '~/components/page/FlexColDiv.vue'
import Select from '~/components/publishing/input/Select.vue'
import RecordCountCard from './RecordCountCard.vue'
import RecordDiaryCard from './RecordDiaryCard.vue'

const recordCards = [
  { id: 1, title: '많이 기록한 감정', recordCount: 0, isEmoji: true, emojiClass: 'touched' },
  { id: 2, title: '남긴 일기 수', recordCount: 1, isNum: true }
]

const diaryText = ref(
  '집에 가는길에 붕어빵을 팔길래 사먹었다. 살찔까봐 걱정은 되지만..#체중62kg인데 언제 살빼나 g인데 언제 살빼나'
)

const periodOptions = [
  { value: '1weeks', label: '1주일' },
  { value: '1month', label: '1개월' },
  { value: '3month', label: '3개월' },
  { value: '6month', label: '6개월' },
  { value: '1year', label: '1년' },
  { value: 'all', label: '전체' }
]

const selectedPeriod = ref('1weeks')

// 일기 상태 타입
type DiaryStatus = 'no-diary' | 'in-progress' | 'completed'

// 현재 일기 상태
const diaryStatus = ref<DiaryStatus>('in-progress')

const diaryStats = ref({
  currentCount: 8, // 현재 작성한 일기 개수
  targetCount: 20, // 목표 개수
  daysLeft: 52 // 남은 일수
})

// 계산된 값들
const remainingDiaries = computed(() => {
  return Math.max(0, diaryStats.value.targetCount - diaryStats.value.currentCount)
})

// 일기 상태별 정보
const diaryInfo = computed(() => {
  const configs = {
    // 일기를 한개도 안썼을 경우
    'no-diary': {
      title: '감정분석을 위한 <br/>마음일기를 시작해보세요.',
      text: `60일 동안 ${diaryStats.value.targetCount}개 이상 기록이 쌓이면, <br/>당신만의 감정 리포트가 열립니다. <br/>첫 마음일기를 남겨보세요!`
    },
    // 일기를 기록중일 경우
    'in-progress': {
      title: '당신의 감정분석을 <br/>준비 중이에요.',
      text: `지금까지의 마음일기 ${diaryStats.value.currentCount}개, <br/>분석까지 ${remainingDiaries.value}개가 더 필요해요. <br/>기록이 많을수록 AI감정 리포트가 정교해져요!`
    },
    // 60일간의 기록을 완료했을 경우
    completed: {
      title: '마음 기록 VIP! <br/>감성분석이 열렸어요.',
      text: `60일간의 기록 달성! <br/>총 ${diaryStats.value.currentCount}개의 마음일기를 바탕으로, <br/>AI 감정분석을 시작할게요!`
    }
  }
  return configs[diaryStatus.value]
})
</script>
<style scoped lang="scss">
.current-mood-section {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  :deep(.c-input) {
    width: auto;
    .c-inp-el {
      width: auto;
      height: auto;
      padding: 0;
      border: none;
      border-radius: 0;
    }
    .custom-select {
      &.custom {
        width: auto;
      }
      .select-display {
        min-width: auto;
        line-height: 2.2rem;
        font-weight: 700;
      }
    }
  }
}
</style>
