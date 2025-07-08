<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>등록 요청할 GA이름과<br />주소를 입력해 주세요.</h2>

      <div>GA 이름</div>
      <input style="padding: 0.25rem; border: 1px solid gainsboro" placeholder="GA 이름" />

      <div>주소</div>
      <input style="padding: 0.25rem; border: 1px solid gainsboro" placeholder="주소" />
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickRequest">GA등록 요청하기</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

const clickRequest = () => {
  navigateTo('/insu/claim/subrogation/serviceNotInUse/selectInsuranceCompany')
}
</script>

<style scoped lang="scss"></style>
