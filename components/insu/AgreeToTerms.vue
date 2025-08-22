<template>
  <div class="wrap-agree-check">
    <Checkbox id="checkBoxAll" v-model="all" custom-style="button agree-all" aria-label="전체동의" />
    <ul class="agree-list">
      <li v-for="(term, index) in termsList" :key="term.key" class="item">
        <Checkbox
          :id="`checkBox-${term.key}`"
          v-model="terms[term.key]"
          custom-style="small non-border"
          :aria-label="term.label"
        />
        <i class="icon-arrow-right" @click="emit('show-detail-term', index)"></i>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Checkbox from '~/components/publishing/input/check.vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<Record<string, boolean>>,
    required: true
  },
  termsList: {
    type: Array as PropType<{ key: string; label: string }[]>,
    required: true
  }
})
const emit = defineEmits(['update:modelValue', 'show-detail-term'])

// refs로 관리
const terms = ref({ ...props.modelValue })
const all = ref(props.modelValue.all ?? false)

// 모든 하위 체크박스 체크 여부
const allChecked = computed(() => props.termsList.every(term => terms.value[term.key]))

// 전체동의 → 하위항목
watch(all, newVal => {
  props.termsList.forEach(term => {
    terms.value[term.key] = newVal
  })
  updateParentModel()
})

// 하위항목 → 전체동의
watch(allChecked, newVal => {
  all.value = newVal
  updateParentModel()
})

// 부모 반영
const updateParentModel = () => {
  emit('update:modelValue', {
    all: all.value,
    ...terms.value
  })
}
</script>

<style scoped lang="scss">
.wrap-agree-check {
  margin-top: 1.2rem;
  .agree-all {
    width: 100%;
  }
  .agree-list {
    padding: 1.2rem 1.6rem;
    .item {
      padding: 0.8rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon-arrow-right {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background: url('/assets/images/insu/icon-arrow-right.svg') no-repeat center center;
        background-size: 100%;
        cursor: pointer;
      }
    }
  }
}
</style>
