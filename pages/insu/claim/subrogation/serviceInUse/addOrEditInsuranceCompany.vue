<template>
  <BaseBody>
    <div>i. 수익자(보험금을 받을 분) 정보 변경은..............</div>
    등록한 보험사 노출
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="movePage">확인</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

const movePage = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/selectInsuranceCompany')
}
</script>
<style scoped lang="scss"></style>
