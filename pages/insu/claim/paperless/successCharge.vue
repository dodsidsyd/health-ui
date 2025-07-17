<template>
  <BaseBody >
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <div>청구서류 자동생성 중이예요</div>

      <div>
        <div style="border: 1px solid gray; padding: 1rem">강동성심병원 12건</div>
      </div>

      <div>전송 결과는 카카오 알림톡으로도 안내해 드립니다.</div>

      <div>
        <div>청구내용</div>
        <hr />
        <div>청구인(피보험자)</div>
        <div>청구건수</div>
        <div>보험금 수령계좌</div>
        <div>청구 보험사</div>
        <div>총 청구 진료비</div>
      </div>

      <div>실손의료비 보상금 예측 서비스 내가 받을 수 있는 보상금은 얼마?</div>

      <button @click="clickHome">청구의신 홈으로</button>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

const clickHome = () => {
  navigateTo('/insu/main')
}
</script>

<style scoped lang="scss"></style>
