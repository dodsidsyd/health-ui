<template>
  <BaseBody>
    <h1>팩스번호를 입력해 주세요</h1>
    <div style="border: 1px solid #8c8c8c; padding: 1rem; border-radius: 7px">설계사 정지혜</div>
    <hr style="margin: 2rem 0" />
    <div style="display: flex; justify-content: space-between">
      <div>
        <div style="font-weight: bold">신한라이프 고객센터</div>
        <div>청구시 개인별로 발급되는 팩스번호가 필요해요<br />고객센터로 문의해 주세요</div>
      </div>
      <button class="c-btn" style="width: 10%">전화</button>
    </div>
    <hr style="margin: 2rem 0" />
    <div style="display: flex; flex-direction: column">
      <label for="fax">팩스번호</label>
      <input
        id="fax"
        v-model="fax"
        style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
        placeholder="팩스번호 입력"
        @input="inputFax"
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

const fax = ref()

const inputFax = () => {
  console.log('팩스 입력')
}

const clickNext = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/confirmChargeInfo')
}
</script>

<style scoped lang="scss"></style>
