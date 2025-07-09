<template>
  <div class="c-count-box">
    <div>
      총 <strong>{{ count }}</strong
      >건
    </div>
    <!-- 버튼 타입 -->
    <div class="select-option btn-type">
      <button type="button" class="active select-item" @click="clickBottomModal">전체</button>
      <button type="button" class="select-item" @click="clickBottomModal">3개월</button>
    </div>

    <BottomModal
      :is-visible="isShowBottomModal"
      v-bind="bottomModalProps"
      @cancel="clickCancel"
      @confirm="clickConfirm"
      @close="toggleBottomModal"
    >
      <template #content>
        <slot name="modal-content">
          <div>기본 모달 내용입니다.</div>
        </slot>
      </template>
    </BottomModal>
  </div>
</template>

<script setup lang="ts">
// Props 정의가 필요한 경우 추가할 수 있습니다.
import { ref } from 'vue'
import { BottomModal } from '@lemonhc/fo-ui/components/modal'
const isShowBottomModal = ref(false)

defineProps<{
  count: number
}>()

const clickBottomModal = () => {
  toggleBottomModal()
}
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

const bottomModalProps = ref({
  title: '조회조건',
  isShowCloseButton: true,
  isShowCancelButton: false,
  isShowConfirmButton: true,
  confirmButtonText: '조회하기',
  disabledCancelButton: false,
  disabledConfirmButton: false
})
</script>

<style scoped lang="scss">
.c-count-box {
  display: flex;
  flex-direction: row;
  .select-option {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    align-items: center;
    &.btn-type {
      .select-item {
        font-size: 1.6rem;
        font-weight: 500;
        color: #555;
        position: relative;
        padding-left: 1.2rem;
        &::before {
          content: '';
          position: absolute;
          left: 0.6rem;
          top: 50%;
          margin-top: -0.6rem;
          display: block;
          width: 0.1rem;
          height: 1.2rem;
          background: #e2e2e2;
        }
        &.active {
          color: vars.$blue-primary;
          font-weight: 700;
        }
        &:first-child {
          padding-left: 0;
          &::before {
            content: none;
          }
        }
      }
    }
  }
}
</style>
