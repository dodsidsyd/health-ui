<template>
  <div class="record-count-card">
    <div class="info">
      <strong class="title">{{ title }}</strong>
      <p class="record-count">{{ displayText }}</p>
    </div>
    <i v-if="isEmoji" :class="['emoji', emojiClass]"></i>
    <strong v-else-if="isNum && recordCount > 0" class="record-number">{{ recordCount }}회</strong>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string
    recordCount?: number
    isEmoji?: boolean
    isNum?: boolean
    emojiClass?: string
  }>(),
  {
    title: '',
    recordCount: 0,
    emojiClass: '',
    isEmoji: false,
    isNum: false
  }
)

// 표시할 텍스트 계산
const displayText = computed(() => {
  if (props.recordCount === 0) {
    // 빈 상태 메시지
    if (props.title === '많이 기록한 감정') {
      return '기록된 감정이 없어요'
    } else if (props.title === '남긴 일기 수') {
      return '남긴 일기가 없어요'
    }
    return '기록이 없어요'
  }

  // 정상 상태 메시지
  return `${props.recordCount}회 언급`
})
</script>
<style lang="scss" scoped>
.record-count-card {
  flex: 1;
  display: flex;
  gap: 1.6rem;
  overflow: hidden;
  flex-direction: column;
  padding: 1.6rem 2rem 2rem;
  border-radius: 2rem;
  background: #f4f4f4;
  .emoji {
    width: 3.2rem;
    height: 3.2rem;
    margin-left: auto;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .title {
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
  p.record-count {
    font-size: 1.4rem;
    line-height: 2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .record-number {
    color: #4c7ff7;
  }
}
</style>
