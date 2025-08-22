<template>
  <FullModal
    :is-visible="isVisible"
    :title="title"
    :is-show-confirm-button="true"
    :is-show-close-button="true"
    :is-show-cancel-button="false"
    confirm-button-text="확인"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <template #content>
      <div class="modal-content">
        <h2 v-html="contentTitle" class="content-title"></h2>

        <!-- 전체 선택 -->
        <div class="select-all-section">
          <Checkbox
            id="select-all"
            :model-value="isAllSelected"
            aria-label="전체 선택"
            @update:model-value="toggleSelectAll"
          />
        </div>

        <div class="category-list">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="category-item"
            :class="{ selected: isItemSelected(item) }"
            @click="toggleItem(item)"
          >
            <Checkbox
              :id="item.id.toString()"
              :model-value="isItemSelected(item)"
              custom-style="button"
              :aria-label="item.name"
              reverse
              @update:model-value="toggleItem(item)"
            />
          </div>
        </div>
      </div>
    </template>
  </FullModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import FullModal from '~/components/common/modal/FullModal.vue'
import Checkbox from '~/components/publishing/input/check.vue'

interface CategoryItem {
  id: string | number
  name: string
}

interface Props {
  isVisible: boolean
  title: string
  items: CategoryItem[]
  selectedItems: CategoryItem[]
  searchPlaceholder: string
  contentTitle: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:isVisible': [value: boolean]
  confirm: [selectedItems: CategoryItem[]]
}>()

// 로컬 상태
const searchText = ref('')
const tempSelectedItems = ref<CategoryItem[]>([])

// 검색 필터링
const filteredItems = computed(() => {
  if (!searchText.value) return props.items
  return props.items.filter(item => item.name.toLowerCase().includes(searchText.value.toLowerCase()))
})

// 선택 상태 확인
const isItemSelected = (item: CategoryItem) => {
  return tempSelectedItems.value.some(selected => selected.id === item.id)
}

// 전체 선택 상태 확인
const isAllSelected = computed(() => {
  return props.items.length > 0 && tempSelectedItems.value.length === props.items.length
})

// 항목 토글
const toggleItem = (item: CategoryItem) => {
  const index = tempSelectedItems.value.findIndex(selected => selected.id === item.id)
  if (index > -1) {
    tempSelectedItems.value.splice(index, 1)
  } else {
    tempSelectedItems.value.push(item)
  }
}

// 전체 선택/해제 토글
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    tempSelectedItems.value = []
  } else {
    tempSelectedItems.value = [...props.items]
  }
}

// 모달 열릴 때 임시 선택 항목 초기화
watch(
  () => props.isVisible,
  newValue => {
    if (newValue) {
      tempSelectedItems.value = [...props.selectedItems]
      searchText.value = ''
    }
  }
)

// 확인 버튼 클릭
const handleConfirm = () => {
  emit('confirm', tempSelectedItems.value)
  emit('update:isVisible', false)
}

// 모달 닫기
const handleClose = () => {
  emit('update:isVisible', false)
}
</script>

<style lang="scss" scoped>
.modal-content {
  .content-title {
    margin-top: 0.4rem;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.1rem;
    text-align: left;
  }
  .select-all-section {
    margin-top: 3.2rem;
    padding: 2rem 0;
    text-align: right;
  }
  .category-list {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    .c-checktype {
      width: 100%;
      :deep(.c-label) {
        width: 100%;
        &:after {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
