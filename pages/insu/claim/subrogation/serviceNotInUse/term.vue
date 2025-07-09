<template>
  <BaseBody>
    <div>(주)레몬헬스케어는 개인(신용)정보를 수집 및 이용.............</div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickNext">동의하고 다음</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

definePageMeta({
  title: '개인정보 수집 및 이용동의'
})

const clickNext = () => {
  // 설계사 가입하기 클릭한 경우
  navigateTo('/insu/claim/subrogation/serviceNotInUse/selectInsuranceCompany')
  // 설계사 대리인 가입하기 클릭한 경우
  //   navigateTo('/insu/claim/subrogation/serviceNotInUse/inputAgentInfo')
}
</script>

<style scoped lang="scss"></style>
