<template>
  <component
    :is="elementType"
    :class="['c-btn', ...buttonClass]"
    :aria-label="ariaLabel || defaultSlotText"
    :href="isLink && elementType === 'a' ? linkHref : undefined"
    :role="isLink && elementType !== 'button' ? 'link' : undefined"
    @click="btnevtClick"
    :style="buttonStyle"
  >
    <!-- 아이콘이 텍스트 앞에 있을 때 -->
    <i
      v-if="icon && iconPosition === 'left'"
      :class="`${icon}`"
      :style="{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        marginRight: '4px',
        backgroundPosition: 'center'
      }"
      aria-hidden="true"
    ></i>
    <!-- 텍스트 -->
    <span class="text">
      <slot>{{ defaultSlotText }}</slot>
    </span>
    <!-- 아이콘이 텍스트 뒤에 있을 때 -->
    <i
      v-if="icon && iconPosition === 'right'"
      :class="`${icon}`"
      :style="{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        marginLeft: '4px',
        backgroundPosition: 'center'
      }"
      aria-hidden="true"
    ></i>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props 정의
const props = defineProps({
  btnType: {
    type: String,
    required: true,
    validator: (value: string) => ['primary', 'secondary', 'tertiary', 'line', 'link', 'text'].includes(value)
  },
  icon: {
    type: String,
    default: '' // Remixicon 아이콘 클래스
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value: string) => ['left', 'right'].includes(value)
  },
  iconSize: {
    type: Number,
    default: 18 // 아이콘 크기
  },
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
  },
  width: {
    type: Number,
    default: ''
  },
  height: {
    type: Number,
    default: ''
  },
  borderRadius: {
    type: Number,
    default: ''
  }
})

// Emits 정의
const emit = defineEmits(['click'])

// 버튼 클래스 계산
const buttonClass = computed(() => [`btn-${props.btnType}`])

// 버튼 스타일 계산
const buttonStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width > 0) style.width = props.width + 'rem'
  if (props.height > 0) style.height = props.height + 'rem'
  if (props.borderRadius > 0) style.borderRadius = props.borderRadius + 'px'
  return style
})

// 기본 슬롯 텍스트 계산
const defaultSlotText = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  const defaultTextMap: Record<'primary' | 'secondary' | 'tertiary' | 'line' | 'link', string> = {
    primary: 'Primary',
    secondary: 'Secondary',
    tertiary: 'Tertiary',
    line: 'Button',
    link: 'Link'
  }
  return defaultTextMap[props.btnType as keyof typeof defaultTextMap] || 'Button'
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
[role='button'],
.c-btn {
  // --primary 은 공통수정 필요
  --primary: 76, 127, 247;
  height: 4.8rem;
  background-color: rgb(var(--primary));
  border-radius: 0.6rem;
  font-size: 1.6rem;
  font-weight: vars.$bold;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  line-height: 1.5;
  color: rgb(var(--white));
  @include mixin.rippleEffectWhite;
  // 두번째 색상
  &.btn-secondary {
    background-color: rgba(232, 232, 232, 1);
    @include mixin.rippleEffectPrimary;
    .text {
      color: rgba(85, 85, 85, 1);
    }
    &:disabled,
    &[disabled] {
      @include mixin.disabled;
      .text {
        color: rgba(149, 149, 149, 1);
      }
    }
  }
  // has border
  &.btn-sticky {
    border-radius: 0;
  }
  // 사이즈 28 36 40 48 56
  &.lg {
    height: 5.6rem;
    font-weight: vars.$bold;
    font-size: var(--num-18);
  }
  &.sm {
    height: 4rem;
    font-weight: vars.$regular;
    font-size: var(--num-16);
  }
  &.xs {
    height: 3.6rem;
    padding: 1.4rem;
    font-weight: vars.$regular;
    font-size: var(--num-14);
  }
  &.xxs {
    height: 2.8rem;
    padding: var(--cbtn-padding-xxs);
    font-weight: vars.$regular;
    font-size: var(--num-12);
  }
  //gray 타입
  &.btn-gray {
    background-color: var(--gray2);
  }
  &.btn-trans {
    background: transparent;
  }
  // outline 타입
  &.btn-line {
    background-color: var(--white);
    outline: 1px solid #e2e2e2;
    border: unset;
    border-radius: 4px;
    &::after {
      background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
    }
    .text {
      color: #2b2b2b;
      font-weight: vars.$medium;
    }
    &:disabled,
    &[disabled] {
      @include mixin.disabled;
      background-color: var(--white);
      .text {
        color: rgba(149, 149, 149, 1);
      }
    }
    &.hasDashed {
      outline: 1px dashed #e2e2e2;
    }
  }
  &.btn-text {
    width: auto;
    height: auto;
    padding: 0;
    background: none;
    color: #2b2b2b;
    font-weight: vars.$regular;
    &::after {
      background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
    }
    &:disabled,
    &[disabled] {
      @include mixin.disabled;
      background-color: var(--white);
      .text {
        color: #555;
      }
    }
    &.hasLine {
      text-decoration: underline;
    }
  }
  // width 오토
  &.w-auto {
    width: auto;
  }
  // disabled
  &:disabled,
  &[disabled] {
    @include mixin.disabled;
    background-color: rgba(210, 210, 210, 1);
    .text {
      color: rgba(149, 149, 149, 1);
    }
  }
  &.ico-set-w {
    .text {
      width: 2rem;
      height: 2rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 2rem;
    }
  }
  &.ico-set {
    .text {
      width: 2rem;
      height: 2rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 2rem;
    }
  }
  &.ico-write {
    .text {
      width: 2.4rem;
      height: 2.4rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 2.4rem;
    }
  }
  &.ico-cate {
    .text {
      width: 1.6rem;
      height: 1.6rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1.6rem;
    }
  }
  &.ico-question {
    .text {
      width: 1.5rem;
      height: 1.5rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1.5rem;
    }
  }
}
</style>
