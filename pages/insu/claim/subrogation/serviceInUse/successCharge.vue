<template>
  <BaseBody>
    <h1>청구서 전송을 완료했어요</h1>
    <div style="padding: 1rem; border: 1px solid gainsboro; border-radius: 7px">
      <div>청구 보험사</div>
      <div>피보험자(치료 받은 분)</div>
      <div>수익자(보험금 받는 분)</div>
    </div>
    <div>① 청구서 전송 실패시................</div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="movePage">청구의신 홈으로</button>
  </BaseFooter>
  <div @click="otherChargeInsuCompany">다른 보험사도 청구하기</div>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

const movePage = () => {
  navigateTo('/insu')
}

const otherChargeInsuCompany = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/selectInsuranceCompany')
}
</script>

<style scoped lang="scss"></style>
