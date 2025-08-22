<template>
  <div :class="['question-card', customClass]" @click="handleClick">
    <img :src="`/_nuxt/assets/images/emoji/${emoji}`" alt="아이콘" class="emoji" />
    <p v-html="currentQuestion"></p>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const props = withDefaults(
  defineProps<{
    emoji?: string
    questions?: string[]
    customClass?: string
  }>(),
  {
    emoji: '',
    questions: () => [],
    customClass: ''
  }
)

// 랜덤하게 질문 선택
const currentQuestion = computed(() => {
  if (props.questions && props.questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * props.questions.length)
    return props.questions[randomIndex]
  }
  return ''
})

const handleClick = () => {
  // create.vue로 이동하면서 질문 정보 전달
  const query = {
    type: 'daily-quote',
    emoji: props.emoji,
    question: currentQuestion.value
  }
  
  router.push({
    path: '/community/diary/create',
    query
  })
}
</script>
<style lang="scss" scoped>
.question-card {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  overflow: hidden;
  padding: 2.4rem 2.8rem;
  border-radius: 2rem;
  .emoji {
    width: 3.2rem;
    height: 3.2rem;
  }
  p {
    display:flex;
    align-items: center;
    min-height: 5rem;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.5rem;
  }
  &.type1 {
    background: #fcf1e9;
  }
  &.type2 {
    background: #efe9f2;
  }
  &.type3 {
    background: #eee;
  }
}
</style>
