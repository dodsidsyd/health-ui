<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>청구할 서류를 첨부해주세요</h2>

      <div>
        <div style="border: 1px solid #8c8c8c; padding: 1rem; border-radius: 7px">설계사 정지혜</div>
      </div>

      <div style="display: flex; gap: 1rem">
        <div style="border: 1px solid gainsboro; padding: 1rem">서류 글씨가 잘 보이도록 촬영</div>
        <div style="border: 1px solid gainsboro; padding: 1rem">최대 15장까지 서류첨부 가능</div>
      </div>

      <!-- 공통으로 만들기 -->
      <div style="padding: 5rem; border: 1px solid gainsboro">서류첨부</div>
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
  navigateTo('/insu/claim/subrogation/serviceInUse/InputFax')
}
</script>

<style scoped lang="scss"></style>
