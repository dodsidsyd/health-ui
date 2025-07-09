<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>수익자(보험금 받는분) 정보를 입력해 주세요.</h2>

      <template v-if="isSame">
        <div style="display: flex; flex-direction: column">
          <div>수익자 이름</div>
          <input type="text" disabled placeholder="홍레몬" />
        </div>
      </template>
      <template v-else>
        <div style="display: flex; flex-direction: column">
          <div>수익자 이름</div>
          <input style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem" />
        </div>

        <div>수익자 주민등록번호</div>
        <div>
          <input style="padding: 0.25rem; border: 1px solid gainsboro; border-radius: 0.25rem" />-
          <input style="padding: 0.25rem; border: 1px solid gainsboro; border-radius: 0.25rem" />
        </div>

        <div style="display: flex; flex-direction: column">
          <div>수익자 휴대폰 번호</div>
          <input style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem" />
        </div>

        <div style="display: flex; flex-direction: column">
          <div>피보험자와의 관계</div>
          <input style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem" />
        </div>
      </template>

      <div style="display: flex; justify-content: space-between">
        <span>보험금 지급계좌</span>
        <span>+ 지급계좌 추가</span>
      </div>

      <div style="border: 1px solid gainsboro; padding: 1rem">
        <div>DB손해보험 자동이체 계좌</div>
        <div>홍레몬 1235548435465465</div>
      </div>

      <div>최근 보험금 지급계좌</div>
      <div style="border: 1px solid gainsboro; padding: 1rem">
        <div>우리은행 자동이체 계좌</div>
        <div>홍레몬 1235548435465465</div>
      </div>
      <div style="border: 1px solid gainsboro; padding: 1rem">
        <div>신한은행 자동이체 계좌</div>
        <div>홍레몬 1235548435465465</div>
      </div>

      <div>새로운 지급계좌</div>
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickNext">확인</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

// 수익자가 같을 경우
const isSame = ref(false)

const clickNext = () => {
  // 사진찍어 청구: 첨부서류 화면으로 이동
  return navigateTo('/insu/claim/picture/attachClaimFiles')
  // 그외
  // return navigateTo('/insu/claim/paperless/confirmChargeInfo')
}
</script>

<style scoped lang="scss"></style>
