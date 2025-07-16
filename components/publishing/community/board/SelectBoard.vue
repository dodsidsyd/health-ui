<template>
  <div class="category-selector">
    <div v-for="category in categories" :key="category.id" class="category-group">
      <div class="category-header">
        <i :class="['icon', category.icon]"></i>
        <h3 class="category-title">{{ category.name }}</h3>
      </div>
      <div class="tag-list">
        <button
          v-for="option in category.options"
          :key="option.value"
          :class="['tag-button', { selected: selectedValue === option.value }]"
          @click="selectAndClose(category.name, option)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface CategoryOption {
  value: string
  label: string
}
interface CategoryGroup {
  id: string
  name: string
  icon: string
  options: CategoryOption[]
}
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  categoriesData: {
    type: Array as () => CategoryGroup[],
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'closeModal'])
const selectedValue = ref<string>(props.modelValue)
const categories = ref<CategoryGroup[]>(props.categoriesData)

watch(
  () => props.modelValue,
  newValue => {
    selectedValue.value = newValue
  },
  { immediate: true }
)

// 옵션 선택 및 모달 닫기 로직
const selectAndClose = (categoryName: string, option: CategoryOption) => {
  selectedValue.value = option.value
  emit('update:modelValue', option.value)

  // '카테고리명 > 옵션명' 형식의 정보를 포함하여 change 이벤트 발생
  emit('change', {
    categoryName: categoryName,
    optionLabel: option.label,
    combinedLabel: `${categoryName} > ${option.label}`,
    value: option.value
  })
  // 모달 닫기
  emit('closeModal')
}
</script>

<style lang="scss" scoped>
.category-selector {
  padding: 1.6rem 0;
}
.category-group {
  margin-bottom: 3.2rem;
  &:last-child {
    margin-bottom: 0;
  }
}
.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  .icon {
    width: 2.8rem;
    height: 2.8rem;
    margin-right: 0.6rem;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .category-title {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 2.2rem;
  }
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.tag-button {
  position: relative;
  padding: 0.9rem 2rem;
  background: #fff;
  border: 0.1rem solid #e2e2e2;
  border-radius: 10rem;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #e9e9e9;
  }
  &.selected {
    background-color: var(--blue-primary);
    border-color: var(--blue-primary);
    color: #fff;
  }
}
</style>
