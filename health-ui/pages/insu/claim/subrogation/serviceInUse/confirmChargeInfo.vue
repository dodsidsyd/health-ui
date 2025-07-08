<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>청구할 내용을 확인해 주세요</h2>

      <div style="border: 1px solid #8c8c8c; padding: 1rem; border-radius: 7px">설계사 정지혜</div>

      <div>
        <div style="border: 1px solid gray; padding: 1rem">신한라이프</div>
      </div>

      <div>
        <div>청구내용</div>
        <hr />
        <div>피보험자(치료 받은 분)</div>
        <div>수익자(보험금 받는 분)</div>
        <div>사고유형</div>
        <div>사고내용</div>
        <div>보험금 수령계좌</div>
        <div>총 청구 진료비</div>
      </div>
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickCharge">청구하기</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

const clickCharge = () => {
  navigateTo('/insu/claim/subrogation/serviceInUse/successCharge')
}
</script>

<style scoped lang="scss"></style>
