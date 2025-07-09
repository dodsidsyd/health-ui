<template>
  <BaseBody>
    <h2>주민등록번호를 입력해 주세요</h2>
    <div>
      <span>주민등록번호</span>
      <input
        style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
        placeholder="주민등록번호를 입력하세요."
      />
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickNext">다음</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

const clickNext = () => {
  navigateTo('/insu/claim/selectInsuranceCompany')
}
</script>

<style scoped lang="scss"></style>
