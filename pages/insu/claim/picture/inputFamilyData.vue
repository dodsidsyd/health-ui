<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>가족 이름, 주민등록번호, 관계, 직업 입력(한 페이지)</h2>
      <div>가족정보는 실손청구가 처음인 경우만 입력해요</div>

      <div style="display: flex; flex-direction: column">
        <span>직업</span>
        <select style="border: 1px solid gray; padding: 10px">
          <option>직장인</option>
          <option>공무원</option>
          <option>전문직</option>
          <option>자영업자</option>
        </select>
      </div>

      <div>
        <div>가족 관계</div>
        <input
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="(예)자녀, 남편, 배우자 등"
        />
      </div>

      <div>
        <div>가족 주민등록번호</div>
        <input
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="가족 이름을 입력해 주세요"
        />
      </div>

      <div>
        <div>가족 이름</div>
        <input
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="가족 이름을 입력해 주세요"
        />
      </div>
    </div>
  </BaseBody>
  <BaseFooter class="is-fixed">
    <button class="c-btn xl" @click="clickNext">확인</button>
  </BaseFooter>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'
import BaseFooter from '~/components/layout/BaseFooter.vue'

const clickNext = () => {
  navigateTo('/insu/claim/inputDefaultInfoData')
}
</script>

<style scoped lang="scss"></style>
