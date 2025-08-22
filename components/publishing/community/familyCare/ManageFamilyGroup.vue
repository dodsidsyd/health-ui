<template>
  <div class="family-group">
    <div class="add-group-tit">
      <button type="button" class="btn-add-group" @click="clickBottomModal">그룹추가 하기</button>
    </div>

    <div class="group-list" ref="groupList">
      <TransitionGroup name="list-move">
        <div
          v-for="(group, index) in displayGroups"
          :key="group.id"
          class="group-item"
          :class="{
            dragging: group.id === draggingId,
            'touch-dragging': isDragging && group.id === draggingId,
            'drag-preview': group.isPreview,
            'shift-down': shouldShiftDown(index),
            'shift-up': shouldShiftUp(index)
          }"
          :style="getItemStyle(group, index)"
          :data-index="index"
          draggable="true"
          @dragstart="onDragStart($event, group, index)"
          @dragend="onDragEnd"
          @dragover="onDragOver($event, index)"
          @drop="onDrop($event, index)"
          @touchstart="onTouchStart($event, group, index)"
          @touchmove="onTouchMove($event)"
          @touchend="onTouchEnd($event)"
        >
          <template v-if="!group.isPreview">
            <button type="button" class="btn-move-list" title="순서 변경"></button>
            <strong class="tit">{{ group.name }}</strong>
            <div class="modify-btns">
              <button
                type="button"
                class="btn-modify"
                @click.stop.prevent="clickBottomModal"
                @touchend.stop.prevent="clickBottomModal"
              >
                이름바꾸기
              </button>
              <button
                type="button"
                class="btn-modify"
                @click.stop.prevent="deleteGroup(index)"
                @touchend.stop.prevent="deleteGroup(index)"
              >
                삭제
              </button>
            </div>
          </template>
        </div>
      </TransitionGroup>
    </div>
    <Teleport to="body">
      <BottomModal
        :is-visible="isShowBottomModal"
        title="그룹명"
        :is-show-close-button="true"
        :is-show-cancel-button="false"
        :is-show-confirm-button="false"
        @close="toggleBottomModal"
      >
        <template #content>
          <div class="pb-32 mb-24">
            <InputText />
            <div class="regist-wrap">
              <button type="button" class="btn-regist">등록하기</button>
            </div>
          </div>
        </template>
      </BottomModal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { ConfirmModal } from '@lemonhc/fo-ui/components/modal'
import BottomModal from '~/components/common/modal/BottomModal.vue'
import InputText from '~/components/publishing/input/InputText.vue'

const clickConfirmModal = async (index: number) => {
  try {
    const modalContent = `
<div style="min-width:24rem; display: flex; flex-direction: column; gap: 1rem; text-align: center">
  <div style="font-weight: bold; font-size: 1.8rem; color: #2b2b2b;">그룹을 삭제하시겠습니까?</div>
<div style="font-size: 1.4rem; color: #666; margin-top: 0.5rem;">
    운영자가 그룹을 삭제할 경우,<br /> 그룹에 있는 모든내용이 삭제됩니다.
    </div>
      </div>`

    const confirmRes = await ConfirmModal.open({
      isVisible: true,
      html: modalContent,
      confirmButtonText: '삭제하기',
      cancelButtonText: '취소하기'
    })

    if (confirmRes) {
      groups.value.splice(index, 1)
    }
  } catch (error) {
    console.error(error)
  }
}

const isShowBottomModal = ref(false)
const clickBottomModal = () => {
  toggleBottomModal()
}
const toggleBottomModal = () => {
  isShowBottomModal.value = !isShowBottomModal.value
}

interface FamilyGroup {
  id: number
  name: string
  isPreview?: boolean
}

// 반응형 데이터
const groups = ref<FamilyGroup[]>([
  { id: 1, name: '우리집' },
  { id: 2, name: '동네친구들' },
  { id: 3, name: '베프' },
  { id: 4, name: '디자인팀' }
])

const draggingId = ref<number | null>(null)
const draggingIndex = ref<number | null>(null)
const isDragging = ref(false)
const targetDropIndex = ref<number | null>(null)
const previewItemId = -999 // 프리뷰 아이템용 고유 ID

// 터치 드래그를 위한 상태
const touchStartY = ref(0)
const touchStartX = ref(0)
const touchStartIndex = ref<number | null>(null)
const touchCurrentY = ref(0)
const touchCurrentX = ref(0)

// 드래그 중 실시간 위치 업데이트를 위한 상태
const draggedItemStyle = ref<{
  position: string
  top: string
  left: string
  width: string
  zIndex: number
  pointerEvents: string
  transform: string
}>({
  position: 'static',
  top: '0px',
  left: '0px',
  width: 'auto',
  zIndex: 1,
  pointerEvents: 'auto',
  transform: 'none'
})

const draggedItemOriginalRect = ref<DOMRect | null>(null)
const groupListRect = ref<DOMRect | null>(null)

// 표시용 그룹 리스트 (프리뷰 포함)
const displayGroups = computed(() => {
  if (!isDragging.value || targetDropIndex.value === null) {
    return groups.value
  }

  const result = [...groups.value]
  const draggedItem = result.find(g => g.id === draggingId.value)

  if (draggedItem && draggingIndex.value !== null) {
    // 현재 드래그 중인 아이템을 제외한 리스트 생성
    const filteredList = result.filter(g => g.id !== draggingId.value)

    // 타겟 위치에 프리뷰 아이템 삽입
    let insertIndex = targetDropIndex.value
    if (draggingIndex.value < targetDropIndex.value) {
      insertIndex = Math.max(0, insertIndex - 1)
    }

    filteredList.splice(insertIndex, 0, {
      id: previewItemId,
      name: '',
      isPreview: true
    })

    // 드래그 중인 아이템을 다시 원래 위치에 추가 (실제 드래그 중인 요소로 표시)
    filteredList.push(draggedItem)

    return filteredList
  }

  return result
})

// 아이템이 아래로 이동해야 하는지 확인
const shouldShiftDown = (index: number) => {
  if (!isDragging.value || targetDropIndex.value === null || draggingIndex.value === null) {
    return false
  }

  const item = displayGroups.value[index]
  if (item.isPreview || item.id === draggingId.value) return false

  // 원래 인덱스 기준으로 계산
  const originalIndex = groups.value.findIndex(g => g.id === item.id)

  return (
    draggingIndex.value < targetDropIndex.value &&
    originalIndex >= draggingIndex.value &&
    originalIndex < targetDropIndex.value
  )
}

// 아이템이 위로 이동해야 하는지 확인
const shouldShiftUp = (index: number) => {
  if (!isDragging.value || targetDropIndex.value === null || draggingIndex.value === null) {
    return false
  }

  const item = displayGroups.value[index]
  if (item.isPreview || item.id === draggingId.value) return false

  // 원래 인덱스 기준으로 계산
  const originalIndex = groups.value.findIndex(g => g.id === item.id)

  return (
    draggingIndex.value > targetDropIndex.value &&
    originalIndex > targetDropIndex.value &&
    originalIndex <= draggingIndex.value
  )
}

// 아이템 스타일 계산
const getItemStyle = (group: FamilyGroup, index: number) => {
  if (group.id === draggingId.value && isDragging.value) {
    return draggedItemStyle.value
  }
  return {}
}

// 데스크톱 드래그 앤 드랍 이벤트 핸들러
const onDragStart = (event: DragEvent, group: FamilyGroup, index: number) => {
  // modify-btns 영역을 클릭한 경우 드래그 시작하지 않음
  const target = event.target as HTMLElement
  if (target.closest('.modify-btns')) {
    event.preventDefault()
    return
  }

  draggingId.value = group.id
  draggingIndex.value = groups.value.findIndex(g => g.id === group.id)
  isDragging.value = true

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', index.toString())
  }

  // 드래그 시작 시 요소의 원래 위치 저장
  const element = event.target as HTMLElement
  const groupItem = element.closest('.group-item') as HTMLElement
  if (groupItem) {
    draggedItemOriginalRect.value = groupItem.getBoundingClientRect()
    const groupList = document.querySelector('.group-list')
    if (groupList) {
      groupListRect.value = groupList.getBoundingClientRect()
    }
  }
}

const onDragEnd = () => {
  // 실제 위치 변경 수행
  if (targetDropIndex.value !== null && draggingIndex.value !== null && targetDropIndex.value !== draggingIndex.value) {
    const movedItem = groups.value.splice(draggingIndex.value, 1)[0]
    let insertIndex = targetDropIndex.value
    if (draggingIndex.value < targetDropIndex.value) {
      insertIndex = insertIndex - 1
    }
    groups.value.splice(insertIndex, 0, movedItem)
  }

  // 상태 초기화
  draggingId.value = null
  draggingIndex.value = null
  targetDropIndex.value = null
  isDragging.value = false
  resetDraggedItemStyle()
}

const onDragOver = (event: DragEvent, index: number) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }

  // 현재 마우스 위치로 타겟 인덱스 계산
  if (draggingId.value !== null && draggingIndex.value !== null) {
    const currentY = event.clientY
    const groupList = document.querySelector('.group-list')

    if (groupList) {
      const groupItems = groupList.querySelectorAll('.group-item:not(.dragging):not(.drag-preview)')
      let newTargetIndex = 0
      let found = false

      groupItems.forEach(item => {
        const rect = item.getBoundingClientRect()
        const itemCenter = rect.top + rect.height / 2

        if (currentY < itemCenter && !found) {
          found = true
        } else if (!found) {
          newTargetIndex++
        }
      })

      // 드래그 중인 아이템 이후의 인덱스는 +1 보정
      if (newTargetIndex > draggingIndex.value) {
        newTargetIndex++
      }

      targetDropIndex.value = Math.min(newTargetIndex, groups.value.length)
    }
  }
}

const onDrop = (event: DragEvent, targetIndex: number) => {
  event.preventDefault()
  // onDragEnd에서 처리하므로 여기서는 기본 동작만 방지
}

// 터치 이벤트 핸들러
const onTouchStart = (event: TouchEvent, group: FamilyGroup, index: number) => {
  // modify-btns 영역을 클릭한 경우 드래그 시작하지 않음
  const target = event.target as HTMLElement
  if (target.closest('.modify-btns') || target.classList.contains('btn-modify')) {
    return
  }

  event.preventDefault()

  const touch = event.touches[0]
  touchStartY.value = touch.clientY
  touchStartX.value = touch.clientX
  touchStartIndex.value = groups.value.findIndex(g => g.id === group.id)
  draggingId.value = group.id
  draggingIndex.value = touchStartIndex.value
  isDragging.value = true

  // 드래그할 요소의 원래 위치와 크기 저장
  const element = event.target as HTMLElement
  const groupItem = element.closest('.group-item') as HTMLElement
  if (groupItem) {
    draggedItemOriginalRect.value = groupItem.getBoundingClientRect()
    const groupList = document.querySelector('.group-list')
    if (groupList) {
      groupListRect.value = groupList.getBoundingClientRect()

      // absolute positioning으로 변경
      draggedItemStyle.value = {
        position: 'fixed',
        top: `${draggedItemOriginalRect.value.top * 0.1}rem`,
        left: `${draggedItemOriginalRect.value.left * 0.1}rem`,
        width: `${draggedItemOriginalRect.value.width * 0.1}rem`,
        zIndex: 1000,
        pointerEvents: 'none',
        transform: 'scale(1.05)'
      }
    }
  }

  // 햅틱 피드백 (지원하는 기기에서)
  if ('vibrate' in navigator) {
    navigator.vibrate(50)
  }
}

const onTouchMove = (event: TouchEvent) => {
  if (!isDragging.value || touchStartIndex.value === null || !draggedItemOriginalRect.value || !groupListRect.value)
    return

  event.preventDefault()

  const touch = event.touches[0]
  touchCurrentY.value = touch.clientY
  touchCurrentX.value = touch.clientX

  const diffY = touchCurrentY.value - touchStartY.value
  const diffX = touchCurrentX.value - touchStartX.value

  // 실시간으로 드래그된 요소의 위치 업데이트
  draggedItemStyle.value = {
    ...draggedItemStyle.value,
    top: `${draggedItemOriginalRect.value.top + diffY}px`,
    left: `${draggedItemOriginalRect.value.left + diffX}px`
  }

  // 현재 터치 위치에서 타겟 인덱스 계산
  const groupList = document.querySelector('.group-list')
  if (groupList) {
    const groupItems = groupList.querySelectorAll('.group-item:not(.touch-dragging):not(.drag-preview)')
    let newTargetIndex = 0
    let found = false

    groupItems.forEach(item => {
      const rect = item.getBoundingClientRect()
      const itemCenter = rect.top + rect.height / 2

      if (touchCurrentY.value < itemCenter && !found) {
        found = true
      } else if (!found) {
        newTargetIndex++
      }
    })

    // 드래그 중인 아이템 이후의 인덱스는 +1 보정
    if (draggingIndex.value !== null && newTargetIndex > draggingIndex.value) {
      newTargetIndex++
    }

    targetDropIndex.value = Math.min(newTargetIndex, groups.value.length)
  }
}

const onTouchEnd = (event: TouchEvent) => {
  event.preventDefault()

  if (!isDragging.value || touchStartIndex.value === null) return

  // 실제 위치 변경 수행
  if (targetDropIndex.value !== null && draggingIndex.value !== null && targetDropIndex.value !== draggingIndex.value) {
    const movedItem = groups.value.splice(draggingIndex.value, 1)[0]
    let insertIndex = targetDropIndex.value
    if (draggingIndex.value < targetDropIndex.value) {
      insertIndex = insertIndex - 1
    }
    groups.value.splice(insertIndex, 0, movedItem)
  }

  // 상태 초기화
  isDragging.value = false
  draggingId.value = null
  draggingIndex.value = null
  touchStartIndex.value = null
  targetDropIndex.value = null
  touchStartY.value = 0
  touchStartX.value = 0
  touchCurrentY.value = 0
  touchCurrentX.value = 0
  resetDraggedItemStyle()
}

// 드래그 스타일 초기화
const resetDraggedItemStyle = () => {
  draggedItemStyle.value = {
    position: 'static',
    top: '0px',
    left: '0px',
    width: 'auto',
    zIndex: 1,
    pointerEvents: 'auto',
    transform: 'none'
  }
  draggedItemOriginalRect.value = null
  groupListRect.value = null
}

const deleteGroup = async (index: number) => {
  try {
    // 실제 groups 배열에서의 인덱스 찾기
    const item = displayGroups.value[index]
    if (item && !item.isPreview) {
      const realIndex = groups.value.findIndex(g => g.id === item.id)
      if (realIndex !== -1) {
        await clickConfirmModal(realIndex)
      }
    }
  } catch (error) {
    console.error('Error in deleteGroup:', error)
  }
}
</script>

<style scoped lang="scss">
.family-group {
  position: relative;

  // 모바일에서 스크롤 방지
  &.dragging-active {
    overflow: hidden;
    touch-action: none;
  }

  .add-group-tit {
    margin-top: 0.8rem;
    padding: 2.2rem 0;
    .btn-add-group {
      display: flex;
      gap: 0 1.2rem;

      &::before {
        content: '';
        display: block;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
        background-color: #4f5561;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M9.00039 5.3999L9.00039 12.5999M12.6004 8.9999L5.40039 8.9999' stroke='white' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
      }
      font-size: 1.6rem;
      font-weight: 700;
      color: #2b2b2b;
    }
  }

  .group-list {
    margin: 0 -2rem;
    position: relative;

    // TransitionGroup 애니메이션
    .list-move-move,
    .list-move-enter-active,
    .list-move-leave-active {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .list-move-enter-from {
      opacity: 0;
      transform: translateX(-30px);
    }

    .list-move-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }

    .list-move-leave-active {
      position: absolute;
      width: 100%;
    }

    .group-item {
      display: flex;
      padding: 2.3rem 2rem;
      gap: 0 1.6rem;
      align-items: center;
      background: rgba(255, 255, 255, 0.5);
      cursor: move;
      transition:
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s ease,
        background 0.2s ease,
        box-shadow 0.2s ease;
      border: 0.2rem solid transparent;
      transform-origin: center;
      will-change: transform;

      // 프리뷰 아이템 (드롭 위치 표시)
      &.drag-preview {
        height: 8rem;
        background: linear-gradient(
          90deg,
          rgba(79, 85, 97, 0.05) 0%,
          rgba(79, 85, 97, 0.15) 50%,
          rgba(79, 85, 97, 0.05) 100%
        );
        border: 0.2rem dashed #4f5561;
        border-radius: 0.8rem;
        opacity: 0.6;
        cursor: default;
        animation: previewPulse 1.5s ease-in-out infinite;
        box-shadow: inset 0 0 20px rgba(79, 85, 97, 0.1);

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 0.2rem;
          background: linear-gradient(90deg, transparent 0%, #4f5561 20%, #4f5561 80%, transparent 100%);
          opacity: 0.3;
        }
      }

      @keyframes previewPulse {
        0%,
        100% {
          opacity: 0.4;
          transform: scaleY(0.95);
        }
        50% {
          opacity: 0.7;
          transform: scaleY(1);
        }
      }

      // 아이템 이동 애니메이션
      &.shift-down {
        transform: translateY(8.4rem);
      }

      &.shift-up {
        transform: translateY(-8.4rem);
      }

      &.dragging,
      &.touch-dragging {
        opacity: 0.95;
        background: rgba(255, 255, 255, 0.98);
        border-color: vars.$blue-primary;
        box-shadow:
          0 1.6rem 3.2rem rgba(0, 0, 0, 0.2),
          0 0.8rem 1.6rem rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transition: none;
        cursor: grabbing;
      }

      &:active {
        cursor: grabbing;
      }

      .btn-move-list {
        width: 2.4rem;
        height: 2.4rem;
        flex: 0 0 auto;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M20 18H4M20 12H4M20 6H4' stroke='%23D5D5D5' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
        cursor: grab;
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.1);
        }

        &:active {
          cursor: grabbing;
          transform: scale(0.95);
        }
      }

      .tit {
        font-size: 1.6rem;
        color: #2b2b2b;
        user-select: none;
        cursor: move;
        padding: 0.5rem;
        margin: -0.5rem;
        border-radius: 4px;
        transition: background 0.2s ease;
        position: relative;

        &::after {
          content: '';
          display: block;
          width: 0.6rem;
          height: 0.6rem;
          background: #f14960;
          border-radius: 50%;
          position: absolute;
          right: -0.2rem;
          top: 0.2rem;
        }
      }

      .modify-btns {
        margin-left: auto;
        display: flex;
        gap: 0 2.4rem;
        pointer-events: auto;
        z-index: 10;
        position: relative;

        .btn-modify {
          font-size: 1.4rem;
          font-weight: 500;
          color: #555;
          position: relative;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: all 0.2s ease;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          user-select: none;

          &:hover {
            color: #333;
            background: rgba(79, 85, 97, 0.05);
          }

          &:active {
            color: #4f5561;
            background: rgba(79, 85, 97, 0.1);
            transform: scale(0.95);
          }

          & + .btn-modify {
            &::before {
              content: '';
              display: block;
              width: 0.1rem;
              height: 1.6rem;
              top: 50%;
              margin-top: -0.8rem;
              position: absolute;
              left: -1.2rem;
              background: #e2e2e2;
            }
          }
        }
      }
    }
  }
}

.regist-wrap {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5.6rem;
  padding: 1.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-top: 0.1rem solid #e2e2e2;

  .btn-regist {
    position: relative;
    font-weight: 500;
    line-height: 2.2rem;
    color: var(--blue-primary);
    overflow: hidden;
    @include mixin.rippleEffectPrimary;
  }
}
</style>
