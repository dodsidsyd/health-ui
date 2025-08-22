<template>
  <!-- BottomModal -->
  <BottomModal
    :is-visible="isShowBottomModal"
    :is-show-cancel-button="false"
    :is-show-confirm-button="false"
    :auto-close="true"
    @close="$emit('close')"
  >
    <template #content>
      <div class="modal-content">
        <Button btnType="text" class="modal-btn edit-btn" @click="selectedDiary && $emit('edit', selectedDiary)">
          수정하기
        </Button>
        <Button btnType="text" class="modal-btn delete-btn" @click="$emit('showDeleteConfirm')"> 삭제하기 </Button>
      </div>
    </template>
  </BottomModal>

  <!-- 삭제 확인 모달 -->
  <ConfirmModal
    :is-visible="isShowConfirmModal"
    title="정말로 일기를 삭제할까요?"
    content="한 번 삭제하면 되돌리 수 없어요."
    :is-show-cancel-button="true"
    :is-show-close-button="true"
    :is-show-confirm-button="true"
    confirm-button-text="삭제하기"
    cancel-button-text="취소"
    @confirm="$emit('confirmDelete')"
    @close="$emit('close')"
    @cancel="$emit('cancelDelete')"
    class="modal-confirm-modal"
  />
</template>

<script setup lang="ts">
import Button from '~/components/publishing/button/Button.vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import ConfirmModal from '~/components/common/modal/ConfirmModal.vue'

// 타입 정의
interface Diary {
  id: number
  date: string
  emoji: {
    src: string
    label: string
  }
  content: string
  createdAt: string
}

interface Props {
  isShowBottomModal: boolean
  isShowConfirmModal: boolean
  selectedDiary: Diary | null
}

interface Emits {
  close: []
  edit: [diary: Diary]
  showDeleteConfirm: []
  confirmDelete: []
  cancelDelete: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style lang="scss" scoped>
.modal-content {
  display: flex;
  flex-direction: column;
}
:deep(.c-btn) {
  text-align: left;
  &.modal-btn {
    display: block;
    width: 100%;
    padding: 1.6rem 0;
    border: none;
    border-radius: 1.2rem;
    font-size: 1.6rem;
    transition: all 0.2s ease;
  }
}
.modal-confirm-modal {
  width: calc(100% - 7.3rem);
  :deep(.c-modal-inner) {
    max-width: 100%;
    width: 100%;
    padding: 0;
  }
  :deep(.c-modal-header) {
    padding: 3.2rem 2rem 2.4rem;
  }
  :deep(.c-modal-body) {
    text-align: left;
    padding: 0 2rem;
  }
}
</style>
