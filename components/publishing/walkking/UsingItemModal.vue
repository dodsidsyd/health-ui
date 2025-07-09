<template>
  <div
    v-if="isVisible"
    id="cModalAlert"
    class="c-modal alert"
    :class="[{ 'is-show': isVisible }]"
    aria-describedby="alertMessage"
  >
    <div class="c-dim" @click="handleClose"></div>
    <div class="c-modal-inner">
      <div class="c-modal-header">
        <template v-if="!$slots.header">
          <button
            v-if="isShowCloseButton"
            type="button"
            class="icon c-modal-close-btn ml-auto"
            aria-label="닫기"
            @click="handleClose"
          >
            <i class="icon close"></i>
          </button>
        </template>
      </div>
      <div class="c-modal-body overflow-initial">
        <slot name="content"></slot>
      </div>
      <div class="c-modal-footer">
        <button type="button" class="c-modal-btn confirm" :disabled="isDisabledConfirmButton" @click="onClickConfirm">
          <span class="text">{{ confirmButtonText }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, computed } from 'vue'
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
  (e: 'confirm', value: boolean): void
  (e: 'close'): void
}>()
const onClickConfirm = () => {
  // emit('confirm', true)
  emit('close')
}

// 모달 닫기
const handleClose = () => {
  emit('close')
}

const onClickCancel = () => {
  emit('close')
}

// computed
const isDisabledCancelButton = computed(() => {
  return props.disabledCancelButton
})

const isDisabledConfirmButton = computed(() => {
  return props.disabledConfirmButton
})

// 컴포넌트 언마운트 시 스크롤 복원
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>
<style scoped lang="scss">
.c-modal-inner {
  width: calc(100% - 4.8rem);
}
</style>
