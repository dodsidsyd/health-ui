<template>
  <div class="sleep-analysis-wrap">
    <div class="title-box">
      <div class="tit-box">
        <div :class="['sleep-division-box', division]"></div>
        <p class="title">{{ title }}수면 분석</p>
      </div>
      <span>{{ advise }}</span>
    </div>

    <div :class="['graph-box', division]">
      <slot></slot>
    </div>
    <div class="diagnosis-box">
      <slot name="diagnosis"></slot>
    </div>
    <hr />
    <div class="comment-box">
      <slot name="comment"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  division: {
    type: String,
    required: true
  }
})
const title = computed(() => {
  switch (props.division) {
    case 'REM':
      return '렘 '
    case 'light':
      return '얕은 '
    case 'deep':
      return '깊은 '
    default:
      return ''
  }
})

const advise = computed(() => {
  switch (props.division) {
    case 'REM':
      return '평균 수면시간의 20~25% 권장'
    case 'light':
      return '평균 수면시간의 15~20% 권장'
    case 'deep':
      return '평균 수면시간의 45~55% 권장'
    default:
      return ''
  }
})
</script>

<style lang="scss" scoped>
.sleep-analysis-wrap {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 2.4rem;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0.4rem 0.4rem 1.2rem 0 rgba(0, 0, 0, 0.04);
  hr {
    height: 0.1rem;
    margin: 0;
    background: #e2e2e2;
    border: none;
  }
}
.sleep-division-box {
  flex-shrink: 0;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.2rem;
  &.REM {
    background-color: #9b48ff;
  }
  &.light {
    background-color: #41bcf5;
  }
  &.deep {
    background-color: #243e8e;
  }
}
.graph-box {
  position: relative;
  height: 15rem;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    height: 4.1rem;
  }
  &.REM::before {
    background: rgba(244, 235, 255, 0.5);
  }
  &.light::before {
    background: rgba(219, 242, 255, 0.5);
  }
  &.deep::before {
    background: rgba(230, 236, 255, 0.5);
  }
}
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tit-box {
    display: flex;
    align-items: center;
    color: #555;
    .title {
      margin-left: 0.8rem;
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 2.2rem;
    }
  }
  span {
    font-size: 1.2rem;
    line-height: 1.6rem;
  }
}
.diagnosis-box {
  line-height: 2.2rem;
  color: #555;
}
.comment-box {
  font-weight: 500;
  line-height: 2.2rem;
}
</style>
