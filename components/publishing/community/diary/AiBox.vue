<template>
  <div :class="['ai-box', type]">
    <strong class="title" v-html="title"></strong>
    <p v-html="text" class="text"></p>
    <Button
      btn-type="line"
      :text="typeConfig.buttonText"
      :aria-label="typeConfig.buttonText"
      :icon="typeConfig.icon"
      :disabled="typeConfig.disabled"
      :class="{ disabled: typeConfig.disabled }"
      @click="typeConfig.action"
    />
  </div>
</template>
<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
const props = withDefaults(
  defineProps<{
    type?: 'no-diary' | 'in-progress' | 'completed'
    title: string
    text: string
    icon: string
  }>(),
  {
    type: 'no-diary'
  }
)

const typeConfigs = {
  'no-diary': {
    buttonText: '마음일기 써보기',
    action: () => handleNoDiary()
  },
  'in-progress': {
    buttonText: '감정 분석을 준비중이예요',
    disabled: 'disabled',
    icon: 'ico-ai',
    action: () => handleInProgress()
  },
  completed: {
    buttonText: '감정 리포트 받기',

    icon: 'ico-ai',
    action: () => handleCompleted()
  }
}

const typeConfig = computed(() => {
  return typeConfigs[props.type]
})

// 액션 핸들러들
const handleNoDiary = () => {
  console.log('일기 쓰기 페이지로 이동')
  navigateTo('/diary/write')
}

const handleInProgress = () => {
  console.log('진행 중인 일기 계속 쓰기')
  navigateTo('/diary/continue')
}

const handleCompleted = () => {
  console.log('완성된 일기 보기')
  navigateTo('/diary/view')
}
</script>
<style scoped lang="scss">
.ai-box {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position:relative;
  overflow: hidden;
  padding: 2.4rem 2rem 2rem;
  border-radius: 2rem;
  background: #f4f4f4;
  &:after {
    display:block;
    content:'';
    position:absolute;
    top:2.4rem;
    right:2rem;
    width:6.75rem;
    height:7.5rem;
    background:url()
  }
  .title {
    font-size: 1.8rem;
    line-height: 2.5rem;
    color: #4c7ff7;
  }
  .text {
    line-height: 2.2rem;
    color: #555;
  }
  .c-btn {
    width: max-content;
    height: auto;
    padding: 1rem 1.6rem;
    background-color: #fff;
    border-radius: 1.8rem;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.6rem;
    gap: 0.2rem;
    margin-left: auto;
    color: #555;
    .icon {
      width: 1.8rem;
      height: 1.8rem;
      margin-right: 0;
    }
    &:disabled {
      background-color: #fff;
      color: #959595;
      :deep(.icon) {
        opacity: 0.3;
      }
    }
  }
  &.no-diary {
  }
  &.in-progress {
  }
  &.completed {
    background: #e7f4ff;
  }
}
</style>
