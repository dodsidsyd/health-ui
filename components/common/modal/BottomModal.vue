<template>
  <div
    v-if="isVisible"
    id="cModalBottom"
    class="c-modal bottom"
    :class="[{ 'is-show': isVisible }]"
    aria-describedby="modalBottomTitle"
  >
    <div class="c-dim" @click="closeModal"></div>
    <div class="c-modal-inner">
      <div class="c-modal-header">
        <strong id="modalBottomTitle" class="c-modal-title">{{ title }}</strong>
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
  disabledConfirmButton: false,
  autoClose: true
})

const emit = defineEmits<{ (e: ModalEmitEvent): void }>()

const closeModal = () => {
  if (!props.autoClose) {
    return
  }
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
