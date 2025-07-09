<template>
  <div
    v-if="isVisible"
    id="cModal"
    class="c-modal"
    :class="[{ 'is-show': isVisible }]"
    aria-describedby="modalTitle"
  >
    <div class="c-dim" @click="closeModal"></div>
    <div class="c-modal-inner">
      <div class="c-modal-header" v-if="title">
        <strong class="c-modal-title" id="modalTitle">{{ title }}</strong>
        <button
          v-if="isShowCloseButton"
          type="button"
          class="c-modal-close-btn"
          aria-label="닫기"
          @click="closeModal"
        ><i class="icon close"></i></button>
      </div>
      <div class="c-modal-body">
        <!-- HTML 메시지 지원 (기존 코드 호환성) -->
        <div v-if="message" v-html="message" />
        <!-- 일반 텍스트 콘텐츠 -->
        <div v-else-if="content">{{ content }}</div>
        <!-- HTML 콘텐츠 -->
        <div v-else-if="html" v-html="html" />
        <!-- 슬롯 콘텐츠 -->
        <slot v-else />
      </div>
      <div class="c-modal-footer">
        <button
          v-if="isShowCancelButton"
          type="button"
          class="c-modal-btn cancel"
          :disabled="isDisabledCancelButton"
          @click="onClickCancel"
        >
          <span class="text">{{ cancelButtonText }}</span>
        </button>
        <button
          v-if="isShowConfirmButton"
          type="button"
          class="c-modal-btn confirm"
          :disabled="isDisabledConfirmButton"
          @click="onClickConfirm"
        >
          <span class="text">{{ confirmButtonText }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // 기존 코드 호환성을 위한 message prop
  message?: string
  
  // 표준 모달 props
  title?: string
  content?: string
  html?: string
  isVisible?: boolean
  isShowCloseButton?: boolean
  isShowCancelButton?: boolean
  isShowConfirmButton?: boolean
  confirmButtonText?: string
  cancelButtonText?: string
  disabledCancelButton?: boolean
  disabledConfirmButton?: boolean
  autoClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  message: '',
  title: '',
  content: '',
  html: '',
  isVisible: true, // 기존 코드 호환성을 위해 기본값 true
  isShowCloseButton: true,
  isShowCancelButton: false, // 기존 코드는 confirm만 있었으므로
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false,
  autoClose: true
})

const emit = defineEmits<{
  (e: 'confirm', value?: boolean): void
  (e: 'cancel', value?: boolean): void
  (e: 'close'): void
}>()

const closeModal = () => {
  if (!props.autoClose) {
    return
  }
  emit('close')
}

const onClickCancel = () => {
  emit('cancel', false)
  if (props.autoClose) {
    emit('close')
  }
}

const onClickConfirm = () => {
  emit('confirm', true)
  if (props.autoClose) {
    emit('close')
  }
}

const isDisabledCancelButton = computed(() => {
  return props.disabledCancelButton
})

const isDisabledConfirmButton = computed(() => {
  return props.disabledConfirmButton
})
