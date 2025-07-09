<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <div>
        <div>설계사 선택</div>
        <input
          v-model="agent"
          style="padding: 0.25rem 0.75rem; border: 1px solid gainsboro; border-radius: 0.25rem"
          placeholder="피보험자 이름"
          @input="searchName"
        />
      </div>

      <div style="display: flex; justify-content: space-between">
        <div>총2건</div>
        <div>전체.최근 7일</div>
      </div>

      <div style="display: flex; flex-direction: column; border: 1px solid #888888; padding: 1rem; border-radius: 10px">
        <div style="display: flex; justify-content: space-between">
          <div>피보험자 동의 대기</div>
          <div>2025.04.01</div>
        </div>
        <div style="display: flex; justify-content: space-between">
          <div>KB손해보험</div>
          <button style="padding: 10px; background-color: #8c8c8c" @click="movePage('historyDetail')">></button>
        </div>
        <hr />
        <div style="display: flex; flex-direction: column; gap: 1rem">
          <div style="display: flex; justify-content: space-between">
            <div>설계사(비서)</div>
            <div>박미란</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>피보험자(치료 받은 분)</div>
            <div>김레몬</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>수익자(보험금을 받을 분)</div>
            <div>김레몬</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>청구사유</div>
            <div>[일반상해]운동 중 발목 접질림</div>
          </div>
        </div>
        <button class="c-btn" style="width: 45%">추가 서류 접수하기</button>
      </div>
    </div>
  </BaseBody>
</template>

<script setup lang="ts">
import BaseBody from '~/components/layout/BaseBody.vue'

definePageMeta({
  title: '대리청구 내역'
})

const agent = ref('')

const searchName = () => {
  console.log('피보험자 검색')
}

const movePage = (type: 'historyDetail') => {
  if (type === 'historyDetail') {
    return navigateTo('/insu/claim/subrogation/serviceInUse/agentClaimHistoryData')
  }
}
</script>

<style scoped lang="scss"></style>
