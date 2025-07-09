<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <!-- /insu/claim/paperless/confirmChargeInfo.vue 같이 쓸 수 있으면 같이 써보자 -->
      <h2>청구할 내용을 확인해 주세요 (사진찍어 청구)</h2>

      <div>
        <div style="border: 1px solid gray; padding: 1rem">신한라이프</div>
      </div>

      <div>
        <div>청구내용</div>
        <hr />
        <div>청구인(피보험자)</div>
        <div>청구건수</div>
        <div>보험금 수령계좌</div>
        <div>청구 보험사</div>
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
  navigateTo('/insu/claim/successCharge')
}
</script>

<style scoped lang="scss"></style>
