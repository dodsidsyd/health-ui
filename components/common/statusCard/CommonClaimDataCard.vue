<template>
  <div class="claimData-card" :class="{ 'no-data': !hasData }">
    <div class="flex flex-row">
      <div class="flex flex-col">
        <p class="tit">{{ title }}</p>
        <strong v-if="mainData && mainData.trim() && hasData" class="data-text">{{ mainData }}</strong>
        <span v-if="text && text.trim()" class="text">{{ text }}</span>
      </div>
      <div class="icon" @click="toggleTooltip">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M9.99919 13.75V13.783M8.125 7.69166C8.125 6.63657 8.96447 5.78125 10 5.78125C11.0355 5.78125 11.875 6.63657 11.875 7.69166C11.875 8.74675 11.0355 9.60207 10 9.60207C10 9.60207 9.99919 10.1723 9.99919 10.8757M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
            stroke="#2B2B2B"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="tooltip" v-show="isTooltipOpen">
          <button type="button" class="c-tooltip-close-btn" aria-label="닫기" @click.stop="closeTooltip"></button>
          <slot name="tooltip" v-if="$slots.tooltip"></slot>
          <div class="tooltext">{{ tooltipContent || '내용내용내용' }}</div>
        </div>
      </div>
    </div>

    <!-- chart가 true일 때: 슬롯 영역 표시 -->
    <div v-if="chart" class="chart-area">
      <slot> </slot>
    </div>

    <!-- chart가 false일 때: 서브 제목 + 서브 데이터 -->
    <div v-else class="flex flex-row space-between">
      <p class="my-data">
        나는<span>{{ myData }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const isTooltipOpen = ref(false)
// Props 타입 정의
interface Props {
  title?: string
  text?: string
  mainData?: string
  chart?: boolean // 차트 모드 여부 (기본값: false)
  hasData?: boolean // 데이터 존재 여부 (기본값: true)
  myData?: string
  tooltipContent?: string
}

// Props 기본값 설정
const props = withDefaults(defineProps<Props>(), {
  title: '',
  text: '',
  mainData: '',
  chart: false, // 기본값은 서브 데이터 모드
  hasData: true, // 기본값은 데이터 있음
  myData: '??',
  tooltipContent: ''
})

const NumFormat = computed(() => {
  const num = Number(props.subNum)
  return isNaN(num) ? '0' : num.toLocaleString()
})

// 서브 컨텐츠가 있는지 확인하는 computed
const hasSubContent = computed(() => {
  return (props.subTitle && props.subTitle.trim()) || (props.subData && props.subData.trim()) || props.subNum
})

// 이모지 타입 계산 (hasData가 false일 때 sleep으로 설정)
const computedEmojiType = computed(() => {
  return !props.hasData ? 'sleep' : props.emojiType
})

const toggleTooltip = () => {
  isTooltipOpen.value = !isTooltipOpen.value
}

const closeTooltip = () => {
  isTooltipOpen.value = false
}
</script>

<style lang="scss" scoped>
.claimData-card {
  overflow: hidden;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  padding-bottom: 2.4rem;
  height: 18.8rem;
  justify-content: space-between;
  position: relative;
  &.no-data {
    box-shadow: none;
    border: 0.1rem solid #eee;
    background: #f9f9f9;
    .badge {
      &.gray {
        font-size: 1.2rem;
        border-radius: 1.2rem;
        line-height: 2.3rem;
        width: 6.7rem;
        text-align: center;
        background: #e9e9e9;
        color: #555;
      }
    }
  }
  .flex-row {
    justify-content: space-between;
    flex-shrink: 0; // 상단 영역 고정
    &.space-between {
      align-items: center;
    }
  }

  .tit {
    margin-bottom: 0.8rem;
    font-weight: 500;
    line-height: 1.9rem;
    color: #555;
  }

  .text {
    margin-top: 0.2rem;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: #959595;
  }

  .data-text {
    font-size: 2rem;
    line-height: 2.6rem;
    color: #4c7ff7;

    &.no-data-text {
      color: #999;
      font-weight: 500;
    }
  }

  .my-data {
    overflow: hidden;
    padding: 0.4rem 0.8rem;
    background: #4f5561;
    border-radius: 1.2rem;
    font-size: 1.2rem;
    color: #fff;
    span {
      display: inline-block;
      margin-left: 0.3rem;
    }
  }

  .icon {
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    flex-shrink: 0;
  }

  // 차트 영역 스타일
  .chart-area {
    flex: 1;
    min-height: 0;
    margin-top: 1rem;
  }
  .tooltip {
    display: flex;
    position: absolute;
    top: 5rem;
    left: 1.5rem;
    width: calc(100% - 3rem);
    min-height: 1rem;
    height: max-content;
    z-index: 100;
    padding: 0.8rem;
    background: #fff;
    border-radius: 0.8rem;
    border: 1px solid #eee;
  }
  .tooltext {
    font-size: 1.4rem;
  }
}
</style>
