<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>본인 자필 서명을 입력해 주세요.</h2>
      <div>기본정보는 실손청구가 처음인 경우만 입력해요.</div>
      <div style="display: flex; flex-direction: column">
        <span>본인 자필 서명</span>
        <div style="padding: 4rem; background-color: #f8f9fa; text-align: center">
          손가락으로 직접<br />여기에 서명해 주세요
        </div>
      </div>
      <div style="display: flex; flex-direction: column">
        <span>직업</span>
        <select style="border: 1px solid gray; padding: 10px">
          <option>직장인</option>
          <option>공무원</option>
          <option>전문직</option>
          <option>자영업자</option>
        </select>
      </div>
      <div style="display: flex; flex-direction: column">
        <span>의료급여 수급권자</span>
        <select style="border: 1px solid gray; padding: 10px">
          <option>해당없음</option>
          <option>1종 또는 2종</option>
        </select>
      </div>
      <div>주소</div>
      <input
        style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
        placeholder="주소를 입력하세요"
      />
      <input
        style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
        placeholder="상세주소 입력"
      />
      <div style="display: flex; flex-direction: column">
        <span>이름</span>
        <input
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="이름"
        />
      </div>
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
  return navigateTo('/insu/claim/inputAccidentType')
}
</script>

<style scoped lang="scss"></style>
