<template>
  <article
    v-if="isVisible"
    id="cModalFullscreen"
    class="c-modal fullscreen dm-modal"
    :class="{ 'is-entering': isEntering, 'is-leaving': isLeaving, 'is-show': isVisible }"
    aria-describedby="DM 팝업"
  >
    <div class="c-modal-overlay" @click="handleClose"></div>
    <div class="c-modal-inner">
      <div class="c-modal-header">
        <DmProfileInfo />
        <div class="dm-search">
          <button type="button" class="c-btn c-icon" aria-label="검색" @click="handleSearchToggle">
            <i class="icon ico-search" aria-hidden="true"></i>
          </button>
          <button
            v-if="isShowCloseButton"
            type="button"
            class="icon c-modal-close-btn"
            aria-label="채팅창 닫기"
            @click="handleClose"
          >
            <i class="icon close"></i>
          </button>
        </div>
        <!-- 검색 창  -->
        <div v-if="isSearchVisible" class="dm-search-wrap">
          <!-- 뒤로가기 버튼 -->
          <button type="button" class="c-btn c-icon back" aria-label="검색창 닫기" @click="handleSearchClose">
            <i class="icon back" aria-hidden="true"></i>
          </button>
          <InputText inp-type="search" />
        </div>
      </div>
      <div class="c-modal-body">
        <DmBody />
      </div>
      <div class="c-modal-footer">
        <div class="dm-footer-input">
          <InputMessage />
          <ButtonSend />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick, computed } from 'vue'

import DmProfileInfo from '~/components/publishing/Dm/DmProfileInfo.vue'
import DmBody from '~/components/publishing/Dm/DmBody.vue'
import InputMessage from '~/components/publishing/input/InputMessage.vue'
import ButtonSend from '~/components/publishing/button/ButtonSend.vue'
import InputText from '~/components/publishing/input/InputText.vue'

import type { BaseModalProps, ModalEmitEvent } from '~/types/common/modal.type'

const props = withDefaults(defineProps<BaseModalProps>(), {
  isVisible: false,
  isShowCloseButton: true,
  isShowCancelButton: true
})

const emit = defineEmits<{ (e: ModalEmitEvent): void }>()

const isEntering = ref(false)
const isLeaving = ref(false)
// 검색 창 표시 상태 추가
const isSearchVisible = ref(false)

// 검색 버튼 클릭 핸들러 추가
const handleSearchToggle = () => {
  isSearchVisible.value = !isSearchVisible.value
}

// 검색 창 닫기 핸들러 추가
const handleSearchClose = () => {
  isSearchVisible.value = false
}

// 모달 표시 상태 변경 감지
watch(
  () => props.isVisible,
  async (newValue, oldValue) => {
    console.log('FullModal isVisible changed:', oldValue, '->', newValue)

    if (newValue) {
      // 모달 열기
      document.body.style.overflow = 'hidden'
      isEntering.value = true
      isLeaving.value = false

      await nextTick()

      // 애니메이션 시작
      setTimeout(() => {
        isEntering.value = false
      }, 0)
    } else {
      // 모달 닫기
      document.body.style.overflow = 'auto'
      isLeaving.value = true
      isEntering.value = false
      // 모달이 닫힐 때 검색창도 닫기
      isSearchVisible.value = false

      // 애니메이션 완료 후 실제로 숨김 처리는 부모에서 관리
      setTimeout(() => {
        isLeaving.value = false
      }, 0)
    }
  },
  { immediate: true }
)

// 모달 닫기
const handleClose = () => {
  emit('close')
}

const onClickCancel = () => {
  emit('close')
}

const onClickConfirm = () => {
  emit('confirm')
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
.dm-search {
  align-self: center;
  display: flex;
  flex-direction: row;
  gap: 0 1.6rem;
  .c-btn {
    .icon {
      width: 2.4rem;
      height: 2.4rem;
      display: inline-block;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
}

.dm-search-wrap {
  position: absolute;
  left: 0;
  width: 100%;
  right: 0;
  padding: 1.2rem 2rem;
  z-index: 10;
  display: flex;
  flex-direction: row;
  background: vars.$white;
  align-items: center;
  gap: 0 1.6rem;

  // 검색창 애니메이션 추가
  animation: slideDown 0.3s ease-out;

  .c-btn {
    position: relative;
    flex: 0 0 auto;
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.6rem;
    background-color: transparent;
    border: none;
    margin-left: -0.4rem;
    cursor: pointer;
    i.icon.back {
      display: inline-block;
      width: 2.4rem;
      height: 2.4rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }
}

// 검색창 슬라이드 애니메이션
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
