<template>
  <div class="insurance-selection-modal">
    <RoundTabs :tabs="roundTabs" :active-key="activeRoundTab" @tab-change="onRoundTabChange" />
    <div class="insurance-grid">
      <button
        v-for="insurance in insuranceCompanies"
        :key="insurance.value"
        class="insurance-option"
        :class="{ selected: selectedInsurance?.value === insurance.value }"
        @click="selectInsuranceOption(insurance)"
      >
        <div class="insurance-logo">
          <img src="/assets/images/insu/logo-alert-db.png" :alt="insurance.label" />
        </div>
        <div class="insurance-name">{{ insurance.label }}</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoundTabs, { type RoundTab } from '~/components/tabbar/RoundTabs.vue'

interface Insurance {
  value: string
  label: string
}

const props = defineProps({
  // RoundTabs에 필요한 props
  roundTabs: {
    type: Array as () => RoundTab[],
    required: true
  },
  activeRoundTab: {
    type: String,
    required: true
  },
  // 보험사 목록과 선택된 보험사에 필요한 props
  insuranceCompanies: {
    type: Array as () => Insurance[],
    required: true
  },
  selectedInsurance: {
    type: Object as () => Insurance | null,
    default: null
  }
})

const emit = defineEmits([
  'tab-change', // RoundTabs의 탭 변경 이벤트
  'select-option' // 보험사 선택 이벤트
])

// RoundTabs에서 발생한 이벤트를 부모로 다시 emit
const onRoundTabChange = (key: string) => {
  emit('tab-change', key)
}

// 보험사 버튼 클릭 시 이벤트를 부모로 다시 emit
const selectInsuranceOption = (insurance: Insurance) => {
  emit('select-option', insurance)
}
</script>

<style scoped lang="scss">
.insurance-selection-modal {
  padding: 2rem 0;
  .insurance-grid {
    display: grid;
    margin-top: 1.6rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    .insurance-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.6rem 0.8rem;
      background-color: #f9f9f9;
      border: 0.1rem solid transparent;
      border-radius: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background-color: #e8e8e8;
      }
      &.selected {
        background-color: #4c7ff7;
        border-color: #4c7ff7;
        .insurance-name {
          color: #ffffff;
        }
      }
      .insurance-logo {
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.4rem;
        img {
          width: 100%;
          height: auto;
        }
      }
      .insurance-name {
        font-size: 1.4rem;
        font-weight: 500;
        text-align: center;
        color: #2b2b2b;
      }
    }
  }
}
</style>
