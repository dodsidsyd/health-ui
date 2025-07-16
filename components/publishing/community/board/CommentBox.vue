<template>
  <div class="comment-wrap">
    <FieldSetVariable class="commentBox" :count-area="false" @input-text-changed="handleTextChange" />
    <button class="comment-btn" type="button" :class="{ active: isButtonActive }"></button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import FieldSetVariable from '~/components/publishing/input/FieldSetVariable.vue'

// 버튼의 active 상태
const isButtonActive = ref(false)

// FieldSetVariable에서 'inputTextChanged' 이벤트 발생 시 호출될 함수
const handleTextChange = (textLength: number) => {
  // 텍스트 길이가 0보다 크면 (한 글자 이상) active 상태로 설정
  isButtonActive.value = textLength > 0
}
</script>

<style scoped lang="scss">
.comment-wrap {
  position: relative;
  display: flex;
  margin: 2.4rem -0.4rem 0;
  padding: 1.6rem 0;
  gap: 1.6rem;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    height: 0.1rem;
    left: -1.6rem;
    right: -1.6rem;
    background-color: #e2e2e2;
  }
  :deep(.c-inpType .c-inp-el) {
    height: 4rem;
  }
  .comment-btn {
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    flex-shrink: 0;
    background: #d2d2d2
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M18.3847 4.06941L2.81665 9.47056C1.75014 9.84058 1.7209 11.3382 2.77216 11.7496L9.08971 14.2217C9.40524 14.3451 9.65486 14.5948 9.77833 14.9103L12.2504 21.2278C12.6618 22.2791 14.1594 22.2499 14.5294 21.1833L19.9306 5.61532C20.2632 4.6566 19.3434 3.73679 18.3847 4.06941Z' fill='white'/%3E%3Cpath d='M9.19922 15.0701L14.1492 10.1201' stroke='%23D2D2D2' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")
      center / 2.4rem no-repeat;
    @include mixin.rippleEffectWhite;
    transition: all 0.4s ease-out;
    &.active {
      background-color: var(--blue-primary);
    }
  }
  .commentBox {
    width: 100%;
    :deep(.c-texttype) {
      background-color: #f4f4f4;
      border: 0;
      &:hover {
        background-color: #f6f9ff;
      }
    }
    :deep(.c-texttype textarea) {
      max-height: 8.8rem;
    }
  }
}
</style>
