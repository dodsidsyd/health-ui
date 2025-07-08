<template>
  <div class="c-input">
    <div class="c-inpType">
      <div class="c-inp-el">
        <input
          :id="inputId"
          v-model="inputValue"
          type="text"
          :name="name"
          class="c-inp"
          :placeholder="placeholder"
          @input="onInput"
        />
        <!-- Clear button -->
        <button
          v-show="inputValue.length > 0"
          class="clear-btn"
          type="button"
          aria-label="작성내용 삭제하기"
          @click="clearInput"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props 정의
interface Props {
  name?: string
  placeholder?: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  placeholder: '메시지를 입력해주세요.',
  modelValue: ''
})

// Emits 정의
const emit = defineEmits<{
  'update:modelValue': [value: string]
  enter: [value: string]
}>()

// 내부 상태
const inputValue = ref(props.modelValue || '')
const inputId = props.name || 'input-message'

// 입력 이벤트 핸들러
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  emit('update:modelValue', target.value)
}

// 입력값 청소
const clearInput = () => {
  inputValue.value = ''
  emit('update:modelValue', '')

  // input 요소에 focus 다시 설정
  const inputEl = document.getElementById(inputId) as HTMLInputElement
  if (inputEl) {
    inputEl.focus()
  }
}

// 입력값이 있는지 확인하는 computed
const hasValue = computed(() => {
  return Boolean(inputValue.value && inputValue.value.trim())
})
</script>

<style lang="scss" scoped>
.c-input {
  width: 100%;
}

.c-inpType {
  .c-inp-el {
    position: relative;
    display: flex;
    align-items: center;
    height: 4rem;
    padding: 0.8rem 1.6rem;
    background-color: #f4f4f4;
    border-color: #f4f4f4;
    border-radius: 0.8rem;
    .c-inp {
      flex: 1 1 auto;
      color: #2b2b2b;
      font-size: 1.6rem;
      font-weight: 500;
      background-color: transparent;
      min-width: 0;
      &::placeholder {
        color: #959595;
      }
    }

    .input-unit {
      width: fit-content;
    }
  }
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  flex-shrink: 0;
  z-index: 10;
  position: relative;

  &:hover {
    background-color: transparent;
  }
}
</style>
