<template>
  <div v-if="isVisible" id="cModal" class="c-modal" :class="[{ 'is-show': isVisible }]" aria-describedby="modalTitle">
    <div class="c-dim" @click="closeModal"></div>
    <div class="c-modal-inner">
      <div class="c-modal-header">
        <strong id="modalTitle" class="c-modal-title">{{ title }}</strong>
        <button v-if="isShowCloseButton" type="button" class="c-modal-close-btn" aria-label="닫기" @click="closeModal">
          <i class="icon close"></i>
        </button>
      </div>
      <div class="c-modal-body">
        <slot name="content"></slot>
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
import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'

const props = withDefaults(defineProps<BaseModalProps>(), {
  title: '',
  isVisible: false,
  isShowCloseButton: true,
  isShowCancelButton: true,
  isShowConfirmButton: true,
  confirmButtonText: '확인',
  cancelButtonText: '취소',
  disabledCancelButton: false,
  disabledConfirmButton: false
})

const emit = defineEmits<{
  (e: ModalEmitEvent): void
}>()

const closeModal = () => {
  emit('close')
}
const onClickCancel = () => {
  emit('cancel')
}
const onClickConfirm = () => {
  emit('confirm')
}

const isDisabledCancelButton = computed(() => {
  return props.disabledCancelButton
})

const isDisabledConfirmButton = computed(() => {
  return props.disabledConfirmButton
})
</script>
