<template>
  <BaseBody
    :show-back-button="false"
    page-title="통원 진료 자동청구 가능 병원"
    logo-type="text"
    :has-notification="false"
    :has-reward="false"
    :has-close-btn="true"
    :has-add-text-left="true"
    class="pb-36"
  >
    <h2 class="section-tit mt-32">MY 병원</h2>
    <div class="wrap-insurance-list">
      <button 
        v-for="(insurance, index) in insuranceList" 
        :key="index"
        class="item" 
        :class="{ checked: insurance.checked }"
        @click="clickInsurance(index)"
      >
        <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:MY 병원" class="logo-insurance" />
        <div class="name-insurance">{{ insurance.name }}</div>
      </button>
    </div>
    <h2 class="section-tit mt-32">전체 병원</h2>
    <div class="wrap-insurance-list">
      <button 
        v-for="(insurance, index) in insuranceAllList" 
        :key="index"
        class="item" 
        :class="{ checked: insurance.checked }"
        @click="clickInsuranceAll(index)"
      >
        <img src="/assets/images/insu/icon_bank_whitebg.svg" alt="로고:전체 병원" class="logo-insurance" />
        <div class="name-insurance">{{ insurance.name }}</div>
      </button>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

// 내 병원 목록 데이터
const insuranceList = ref([
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false }
])

const clickInsurance = (index: number) => {
  insuranceList.value[index].checked = !insuranceList.value[index].checked
}
// 전체 병원 목록 데이터
const insuranceAllList = ref([
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false },
  { name: 'DB손해', checked: false }
])

const clickInsuranceAll = (index: number) => {
  insuranceAllList.value[index].checked = !insuranceAllList.value[index].checked
}
</script>
<style scoped lang="scss">
.wrap-insurance-list {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
	grid-auto-columns: auto;
  gap: 0.8rem;
  .item {
    padding: 1.8rem 1.6rem 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    border-radius: 0.8rem;
    background-color: #F9F9F9;
    border: 0.1rem solid #F9F9F9;
    &:active,
    &.checked {
      border: 0.1rem solid #555555;
    }
    .logo-insurance {
      width: 4rem;
      height: 4rem;
    }
    .name-insurance {
      font-size: 1.4rem;
      font-weight: 500;
      color: #2B2B2B;
    }
  }
}
.section-tit {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2B2B2B;
}
</style>