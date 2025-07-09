<template>
  <BaseBody>
    <div style="display: flex; flex-direction: column; gap: 1rem">
      <h2>진단서 사본 서류를 첨부해주세요</h2>
      <div style="display: flex; flex-direction: column; gap: 0.75rem">
        <div>i. 청구 서류 글씨가 잘 보이도록 촬영해 주세요</div>
        <div>i. 최대 15장까지 서류를 첨부할 수 있어요</div>
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
  // 이동 페이지 필요
}
</script>

<style scoped lang="scss"></style>
