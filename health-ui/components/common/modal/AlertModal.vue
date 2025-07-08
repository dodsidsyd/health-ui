<template>
  <div
    v-if="isVisible"
    id="cModalAlert"
    class="c-modal alert"
    :class="[{ 'is-show': isVisible }]"
    aria-describedby="alertMessage"
  >
    <div class="c-dim" @click="closeModal"></div>
    <div class="c-modal-inner">
      <div v-if="!html" id="alertMessage" class="c-modal-body">{{ content }}</div>
      <div v-else id="alertMessage" class="c-modal-body" v-html="html"></div>
      <div class="c-modal-footer">
        <button type="button" class="c-modal-btn confirm" :disabled="isDisabledConfirmButton" @click="onClickConfirm">
          <span class="text">{{ confirmButtonText }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AlertModalProps } from '@/types/common/modal.type'

const props = withDefaults(defineProps<AlertModalProps>(), {
  content: undefined,
  html: undefined,
  isVisible: false,
  confirmButtonText: '확인',
  disabledConfirmButton: false
})

const emit = defineEmits<{
  (e: 'confirm', value: boolean): void
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}

const onClickConfirm = () => {
  emit('confirm', true)
}

const isDisabledConfirmButton = computed(() => {
  return props.disabledConfirmButton
})
</script>
