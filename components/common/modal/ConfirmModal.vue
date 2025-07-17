<template>
  <div v-if="isVisible" id="cModal" class="c-modal" :class="[{ 'is-show': isVisible }]" aria-describedby="modalTitle">
    <div class="c-dim" @click="closeModal"></div>
    <div class="c-modal-inner">
      <div class="c-modal-header">
        <strong class="c-modal-title" id="modalTitle">{{ title }}</strong>
        <button v-if="isShowCloseButton" type="button" class="c-modal-close-btn" aria-label="닫기" @click="closeModal">
          <i class="icon close"></i>
        </button>
      </div>
      <div class="c-modal-body">
        <div v-if="html" v-html="html" />
        <div v-else-if="content">{{ content }}</div>
      </div>
      <div v-if="isShowFooter" class="c-modal-footer">
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
import type { ConfirmModalProps } from '@/types/common/modal.type'

const props = withDefaults(defineProps<ConfirmModalProps>(), {
  title: '',
  isVisible: false,
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  isShowFooter: true,
  html: '',
  content: '',
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const emit = defineEmits<{
  (e: 'confirm', value: boolean): void
  (e: 'cancel', value: boolean): void
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}
const onClickCancel = () => {
  emit('cancel', false)
}
const onClickConfirm = () => {
  emit('confirm', true)
}

const isDisabledCancelButton = computed(() => {
  return props.disabledCancelButton
})

const isDisabledConfirmButton = computed(() => {
  return props.disabledConfirmButton
})
</script>
