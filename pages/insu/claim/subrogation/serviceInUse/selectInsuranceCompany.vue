<template>
  <BaseBody>
    <h2>청구할 보험사를 선택해 주세요</h2>
    <div>설계사 정지혜</div>

    <div>
      <button class="c-btn outline" style="margin-top: 10px" @click="movePage">
        <span>DB손해보험</span>
        <span>기업은행 1111-2321312-124133</span>
      </button>
      <button class="c-btn outline" style="margin-top: 10px" @click="movePage">
        <span>보험사명</span>
        <span>기업은행 1111-2321312-124133</span>
      </button>
      <button class="c-btn outline" style="margin-top: 10px" @click="movePage">
        <span>보험사명</span>
        <span>자동이체 계좌</span>
      </button>
      <button class="c-btn outline" style="margin-top: 10px" @click="movePage">
        <span>보험사명</span>
        <span>자동이체 계좌</span>
      </button>
    </div>

    <button class="c-btn" style="background-color: #d2d2d2; margin-top: 25px" @click="AddOrEditInsuranceCompany">
      보험사 추사/수정
    </button>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

const AddOrEditInsuranceCompany = () => {
  return navigateTo('/insu/claim/subrogation/serviceInUse/addOrEditInsuranceCompany')
}

const movePage = () => {
  return navigateTo({ path: '/insu/claim/inputAccidentData', query: { entryType: 'subrogation' } })
}
</script>

<style scoped lang="scss"></style>
