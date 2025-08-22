<template>
  <FieldSet
    :model-value="modelValue"
    class="diary-fieldset"
    placeholder="편하게 마음속 이야기를 남겨보세요.&#10;마음일기는 나만 볼 수 있어요."
    :disabled="disabled"
    :max-length="9999"
    @update:model-value="handleInput"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>

<script setup lang="ts">
import FieldSet from '~/components/publishing/input/FieldSet.vue'
import { ref, nextTick, onMounted, watch } from 'vue'

interface Props {
  modelValue: string
  disabled?: boolean
}

interface Emits {
  'update:modelValue': [value: string]
  focus: []
  blur: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// textarea 참조
const textareaRef = ref<HTMLTextAreaElement | null>(null)

// 자동 높이 조절 함수
const handleResizeHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto' // height 초기화

    // 텍스트가 없으면 min-height로 유지
    if (!props.modelValue || props.modelValue.trim() === '') {
      textareaRef.value.style.height = '5.8rem'
      return
    }

    const scrollHeight = textareaRef.value.scrollHeight
    const minHeight = 5 * 16 // 5rem을 px로 변환 (1rem = 16px)
    const newHeight = Math.max(scrollHeight, minHeight)
    textareaRef.value.style.height = newHeight + 'px'
  }
}

// 입력 이벤트 핸들러
const handleInput = (value: string) => {
  emit('update:modelValue', value)
  nextTick(() => {
    handleResizeHeight()
  })
}

// modelValue 변경 감지하여 높이 조절
watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      handleResizeHeight()
    })
  }
)

// 컴포넌트 마운트 시 textarea 참조 설정
onMounted(() => {
  nextTick(() => {
    // FieldSet 내부의 textarea 요소 찾기
    const textarea = document.querySelector('.diary-fieldset textarea') as HTMLTextAreaElement
    if (textarea) {
      textareaRef.value = textarea
      handleResizeHeight() // 초기 높이 설정
    }
  })
})
</script>

<style scoped>
.diary-fieldset :deep(.c-texttype) {
  padding: 0;
  border: none;
  height: auto !important;
  min-height: 5.8rem;
  max-height: none !important;
  display: block !important;
}

.diary-fieldset :deep(.c-texttype .c-inp-el) {
  height: auto !important;
  min-height: 5.8rem;
}

.diary-fieldset :deep(.c-texttype .c-inp-el textarea) {
  height: auto;
  min-height: 5.8rem;
  max-height: none !important;
  resize: none;
  line-height: 1.6;
  box-sizing: border-box;
  font-size: 1.8rem;
  line-height: 2.9rem;
  color: #555;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}

.diary-fieldset :deep(.c-texttype:hover) {
  background: #fff;
}

.diary-fieldset :deep(.c-texttype .group_feedback) {
  display: none;
}

.diary-fieldset :deep(.c-texttype:disabled) {
  background: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}
</style>
