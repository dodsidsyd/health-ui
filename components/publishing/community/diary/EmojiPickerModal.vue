<template>
  <BottomModal
    :is-visible="isVisible"
    :title="title"
    :is-show-close-button="true"
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    :disabled-cancel-button="false"
    :disabled-confirm-button="false"
    @cancel="handleCancel"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <template #content>
      <Emoji @emoji-selected="handleEmojiSelected" />
    </template>
  </BottomModal>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import Emoji from './Emoji.vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '오늘은 어떤 하루였나요?'
  },
  returnPath: {
    type: String,
    default: '/community/diary/create'
  },
  selectedDate: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'emoji-selected'])

const handleEmojiSelected = (selectedEmoji) => {
  // 이모지 선택 시 처리
  emit('emoji-selected', selectedEmoji)
  
  // 기본 동작: returnPath로 이동
  if (props.returnPath) {
    const query = {
      date: props.selectedDate || route.query.date,
      emoji: selectedEmoji.file,
      name: selectedEmoji.name
    }
    
    // 모달 닫기
    emit('close')
    
    // 페이지 이동
    router.push({
      path: props.returnPath,
      query
    })
  }
}

const handleCancel = () => {
  emit('close')
}

const handleConfirm = () => {
  emit('close')
}

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
/* 필요한 스타일이 있다면 여기에 추가 */
</style> 