<template>
  <div class="status-card">
    <div class="flex flex-row">
      <div class="flex flex-col gap-8">
        <p class="tit">{{ title }}</p>
        <strong class="data-text">{{ mainData }}</strong>
      </div>
      <i :class="['icon', cardType]" aria-label="hidden"></i>
    </div>

    <!-- chart가 true일 때: 슬롯 영역 표시 -->
    <div v-if="chart" class="chart-area">
      <slot></slot>
    </div>

    <!-- chart가 false일 때: 서브 제목 + 서브 데이터 + 이모지 영역 표시 -->
    <div v-else class="flex flex-row space-between">
      <div class="flex flex-col">
        <p class="sub-title">{{ subTitle }}</p>
        <strong class="sub-data-text">{{ subData }}</strong>
      </div>
      <i :class="['emoji', emojiType]" aria-label="hidden"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 타입 정의
interface Props {
  title: string
  mainData: string
  cardType: string
  chart?: boolean // 차트 모드 여부 (기본값: false)
  // chart = false일 때 사용되는 props
  subTitle?: string // 서브 제목 (chart = false일 때 사용)
  subData?: string // 서브 데이터 (chart = false일 때 사용)
  emojiType?: string // 이모지 타입 (chart = false일 때 사용)
}

// Props 기본값 설정
const props = withDefaults(defineProps<Props>(), {
  title: '',
  mainData: '',
  cardType: '',
  chart: false, // 기본값은 서브 데이터 모드
  subTitle: '',
  subData: '',
  emojiType: ''
})
</script>

<style lang="scss" scoped>
.status-card {
  overflow: hidden;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #eee;
  background: #fff;
  box-shadow: 0 0 2.3rem 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  padding-bottom: 3.2rem;
  height: 18.8rem;
  justify-content: space-between;
  position: relative;

  .flex-row {
    justify-content: space-between;
    flex-shrink: 0; // 상단 영역 고정
  }

  .tit {
    font-weight: 500;
    color: #555;
  }

  .sub-title {
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 500;
    color: #959595;
  }

  .sub-data-text {
    line-height: 2.2rem;
    color: #555;
  }

  .data-text {
    font-size: 2rem;
    line-height: 2.6rem;
    color: #2b2b2b;
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

  .emoji {
    display: block;
    width: 4rem;
    height: 4rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  // 차트 영역 스타일
  .chart-area {
    flex: 1;
    min-height: 0;
    margin-top: 1rem;
  }
}
</style>
