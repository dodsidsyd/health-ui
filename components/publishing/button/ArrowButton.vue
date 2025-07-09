<template>
  <component
    :is="elementType"
    :class="['c-btn icon arrow-type']"
    :aria-label="ariaLabel || defaultSlotText"
    :href="isLink && elementType === 'a' ? linkHref : undefined"
    :role="isLink && elementType !== 'button' ? 'link' : undefined"
    :style="buttonStyle"
    @click="btnevtClick"
  >
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
const props = defineProps({
  ariaLabel: {
    type: String,
    default: '' // 접근성 레이블
  },
  isLink: {
    type: Boolean,
    default: false // 링크 여부
  },
  linkHref: {
    type: String,
    default: '' // 링크 대상
  },
  elementType: {
    type: String,
    default: 'button',
    validator: (value: string) => ['a', 'button', 'div'].includes(value)
  }
})

// 이벤트 정의
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 기본 슬롯 텍스트 (accessibility를 위한 기본값)
const defaultSlotText = computed(() => {
  return '상세보기'
})

// 버튼 스타일 (필요시 사용)
const buttonStyle = computed(() => {
  return {}
})

// 클릭 핸들러
const btnevtClick = (event: MouseEvent) => {
  if (props.elementType === 'a' && !props.linkHref) {
    event.preventDefault() // 링크 없는 a 태그 동작 차단
  }
  emit('click', event) // 클릭 이벤트 방출
}
</script>

<style scoped lang="scss">
.c-btn {
  &.arrow-type {
    width: 2rem;
    height: 2rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
}
</style>
