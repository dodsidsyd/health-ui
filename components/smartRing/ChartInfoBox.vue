<template>
  <div class="chart-info-box" :class="statusClass">
    <strong class="vitality-tit">{{ statusData.title }}</strong>
    <span class="vital-advice">{{ statusData.advice }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

// Props 정의
const props = defineProps({
  status: {
    type: String,
    default: 'no-data',
    validator: (value: string) => {
      return ['excellent', 'good', 'normal', 'dislike', 'bad', 'no-data'].includes(value)
    }
  }
})

// status에 따른 데이터 정의
const statusDataMap = {
  excellent: {
    title: '훌륭해요!',
    advice: '최고의 컨디션을 유지하고 있어요'
  },
  good: {
    title: '좋아요!',
    advice: '건강한 상태를 잘 유지하고 있어요'
  },
  normal: {
    title: '평범해요',
    advice: '컨디션 관리에 조금 더 신경써보세요'
  },
  dislike: {
    title: '주의하세요',
    advice: '활력 점수가 낮아요. 충분한 휴식이 필요해요'
  },
  bad: {
    title: '경고!!',
    advice: '스트레스 완화가 필요해요'
  },
  'no-data': {
    title: '',
    advice: '데이터가 충분하지 않아요'
  }
}

// 현재 status에 따른 데이터
const statusData = computed(() => {
  return statusDataMap[props.status] || statusDataMap['no-data']
})

// 현재 status에 따른 클래스
const statusClass = computed(() => {
  return props.status
})

// 디버깅을 위한 watch 추가 (개발 완료 후 제거 가능)
watch(
  () => props.status,
  (newStatus, oldStatus) => {
    console.log('🔄 ChartInfoBox status 변경:', { oldStatus, newStatus })
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.chart-info-box {
  border-radius: 1.2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem 0;
  background: #e7f4ff !important; // 기본 배경
  transition: all 0.3s ease; // 부드러운 전환 효과

  &.no-data {
    text-align: center;
    background-color: #f4f4f4 !important;

    .vitality-tit {
      font-size: 0;
    }
  }

  &.excellent,
  &.good {
    background: #e3f2fd !important;

    .vitality-tit {
      color: #2b2b2b !important;
    }

    .vital-advice {
      color: #555 !important;
    }
  }

  &.normal {
    background: #fff3e0 !important;
  }

  &.dislike {
    background: #fdeaea !important;
  }

  &.bad {
    background: #ff525262 !important;
  }

  .vitality-tit {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2b2b2b;
  }

  .vital-advice {
    font-size: 1.6rem;
    font-weight: 400;
    color: #555;
  }
}
</style>
