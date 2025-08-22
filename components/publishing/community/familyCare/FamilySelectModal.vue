<template>
  <BottomModal
    :is-visible="isVisible"
    :add-title="`패밀리 선택 <span class='counter'>${selectedCount > 0 ? selectedCount : ''}</span>`"
    :is-show-cancel-button="false"
    :is-show-close-button="true"
    :is-show-confirm-button="true"
    confirm-button-text="완료"
    :auto-close="true"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <template #content>
      <div class="family-select-content">
        <!-- 패밀리 목록 -->
        <div class="family-list">
          <div
            v-for="family in filteredFamilies"
            :key="family.id"
            class="family-item"
            :class="{ selected: selectedFamilyIds.includes(family.id) }"
            @click="toggleFamilySelection(family)"
          >
            <div class="family-info">
              <img :src="getImageUrl(family.profileImage)" :alt="family.name" class="profile-image" />
              <strong class="family-name">{{ family.name }}</strong>
            </div>
            <div class="check-icon">
              <i class="icon check" :class="{ selected: selectedFamilyIds.includes(family.id) }"></i>
            </div>
          </div>
        </div>

        <!-- 패밀리가 없을 때 -->
        <div v-if="filteredFamilies.length === 0" class="no-family">
          <p>패밀리가 없습니다.</p>
        </div>
      </div>
    </template>
  </BottomModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BottomModal from '~/components/common/modal/BottomModal.vue'

interface Family {
  id: string
  name: string
  relation: string
  profileImage: string
}

interface Props {
  isVisible: boolean
  families?: Family[]
  selectedFamilyIds?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  families: () => [],
  selectedFamilyIds: () => []
})

interface Emits {
  (e: 'close'): void
  (e: 'confirm', selectedFamilies: Family[]): void
  (e: 'update:selectedFamilyIds', familyIds: string[]): void
}

const emit = defineEmits<Emits>()

// 로컬 상태
const selectedFamilyIds = ref<string[]>([...props.selectedFamilyIds])

// 선택된 패밀리 수
const selectedCount = computed(() => selectedFamilyIds.value.length)

// 이미지 경로 처리
const basePath = '/_nuxt/assets/images/'
const getImageUrl = (src: string) => {
  if (src) {
    return `${basePath}${src}`
  }
  return ''
}

// 필터된 패밀리 목록 (검색 기능 제거)
const filteredFamilies = computed(() => {
  return props.families
})

// 패밀리 선택 토글
const toggleFamilySelection = (family: Family) => {
  const index = selectedFamilyIds.value.indexOf(family.id)
  if (index > -1) {
    // 이미 선택된 경우 제거
    selectedFamilyIds.value.splice(index, 1)
  } else {
    // 선택되지 않은 경우 추가
    selectedFamilyIds.value.push(family.id)
  }
}

// 완료 버튼 클릭
const handleConfirm = () => {
  const selectedFamilies = props.families.filter(family => selectedFamilyIds.value.includes(family.id))
  emit('confirm', selectedFamilies)
  emit('update:selectedFamilyIds', selectedFamilyIds.value)
  handleClose()
}

// 모달 닫기
const handleClose = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
:deep(.c-modal-title) {
  .counter {
    color: #007bff;
    font-weight: 600;
  }
}

.family-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.family-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 0.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
  &.selected {
  }
}

.family-info {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex: 1;
}

.profile-image {
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  object-fit: cover;
}

.family-name {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.2rem;
}

.family-relation {
  font-size: 1.4rem;
  color: #666;
  line-height: 1.3;
}

.check-icon {
}

.icon.check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1.5px solid #eee;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23E2E2E2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-size: 1.9rem;
  background-repeat: no-repeat;
  background-position: center;
  transition:
    background-color 0.2s ease-in,
    border-color 0.2s ease-in;

  &.selected {
    border-color: #4c7ff7;
    background-color: #4c7ff7;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M13.8397 7.12L8.11205 12.88L6.15967 10.9166' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
}

.no-family {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;

  p {
    font-size: 1.4rem;
    color: #999;
    text-align: center;
  }
}
</style>
