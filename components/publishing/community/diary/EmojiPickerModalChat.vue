<template>
  <BottomModal
    :is-visible="isVisible"
    :title="title"
    :is-show-close-button="true"
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    @close="handleClose"
  >
    <template #content>
      <Emoji @emoji-selected="handleEmojiSelected" />
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import BottomModal from '~/components/common/modal/BottomModal.vue'
import Emoji from './Emoji.vue'

interface Props {
  isVisible: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: false,
  title: '이모지를 선택하세요'
})

const emit = defineEmits<{
  close: []
  'emoji-selected': [emoji: { file: string; name: string }]
}>()

const handleEmojiSelected = (selectedEmoji: { file: string; name: string }) => {
  // 이모지 선택 시 부모 컴포넌트로 전달
  emit('emoji-selected', selectedEmoji)
  // 모달 닫기
  emit('close')
}

const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
/* 필요한 스타일이 있다면 여기에 추가 */
</style>
